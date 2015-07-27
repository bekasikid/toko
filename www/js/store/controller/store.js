/**
 * Created by goer on 5/21/15.
 */
angular.module('StoreModule', ['angular-carousel','ngFileUpload'])

    .controller('headerCtrl', function ($scope, cartFactory, userFactory,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        if($scope.loggedin.user_role=='customer'){
            $scope.cart = cartFactory.getItems();
        }

        if($state.$current.name=='home.cart'){
            $scope.title = 'Keranjang Belanja';
        }else if($state.$current.name=='home.history'){
            $scope.title = 'Riwayat';
        }else if($state.$current.name=='home.historyid'){
            $scope.title = 'Detail Riwayat';
        }else if($state.$current.name=='home.category'){
            $scope.title = 'Daftar Produk';
        }else if($state.$current.name=='home.store.search'){
            $scope.title = 'Daftar Produk';
        }else if($state.$current.name=='home.store.all'){
            $scope.title = 'Daftar Produk';
        }else{
            $scope.title = 'TUKAR POINT';
        }

    })
    .controller('ProductListCtrl', function ($scope, cartFactory, userFactory, productFactory, providerFactory,$ionicSlideBoxDelegate) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.myInterval = 300;

        productFactory.getPromo().then(function(data){
            $scope.carouselLists = data;
        });

        productFactory.getItems(0).then(function(data){
            $scope.products = data;
            $ionicSlideBoxDelegate.update();
        });

        productFactory.newItems().then(function(data){
            $scope.newProducts = data;
            $ionicSlideBoxDelegate.update();
        });

        $scope.add = function (item) {
            //item.approved = 0;
            cartFactory.add(item);
            //console.log(cartFactory.getItems());
        };
    })
    .controller('productCategoryCtrl', function ($scope, userFactory, productFactory, providerFactory,$stateParams,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        if(($scope.loggedin.user_id>0)&&($scope.loggedin.user_role=='customer')){
            var active = productFactory.getActive();
            if(Object.keys(active).length==0){
                productFactory.setActive($scope.loggedin.providers[0].provider_id);
            }
        }

        //console.log($state);

        $scope.productsList = [];
        $scope.page = 0;
        $scope.limit = 1;
        $scope.noMoreData = false;
        $scope.loadMore = function(){
            if($state.$current.name=='home.product-all'){
                productFactory.getItems($scope.page).then(function(data){
                    $scope.productsList = $scope.productsList.concat(data);
                    if(data.length<$scope.limit){
                        $scope.noMoreData = true;
                    }
                    $scope.page++;
                    $scope.$broadcast('scroll.infiniteScrollComplete');

                });
            }else{
                if($stateParams.id){
                    productFactory.categoryItems($stateParams.id,$scope.page).then(function(data){
                        $scope.productsList = $scope.productsList.concat(data);
                        if(data.length<$scope.limit){
                            $scope.noMoreData = true;
                        }
                        $scope.page++;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    });
                }else{
                    productFactory.searchItems($stateParams.name,$scope.page).then(function(data){
                        $scope.productsList = $scope.productsList.concat(data);
                        if(data.length<$scope.limit){
                            $scope.noMoreData = true;
                        }
                        $scope.page++;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    });
                }
            }


        };

    })
    .controller('productDetailCtrl', function ($scope, $stateParams, cartFactory, userFactory,productFactory,providerFactory,$location) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = productFactory.getActive();

        $scope.prod = {
            points : 0,
            topup:0
        };

        $scope.product = {
            product_point : 0
        };

        productFactory.getItemById($stateParams.id).then(function(row){
            $scope.product=row;
            $scope.prod.points = row.point;

            if($scope.loggedin.user_id>0){
                //set max points
                $scope.upoint = userFactory.getPoints($scope.provider);
                if($scope.upoint<$scope.product.point){
                    $scope.maxpoints =$scope.upoint;
                }else{
                    $scope.maxpoints = $scope.product.point;
                }
                //console.log($scope.upoint);
                //console.log($scope.maxpoints);
                $scope.$watch("prod.points",function(){
                    $scope.prod.topup = ($scope.product.point - $scope.prod.points) * $scope.provider.provider_point;
                    //jaga slider supaya tidak boleh lebih besar dr max points
                    //console.log($scope.prod.points);
                    //console.log($scope.product.point);
                    //console.log($scope.provider.provider_point);
                    if(parseInt($scope.prod.points) > $scope.maxpoints){
                        $scope.prod.points = $scope.maxpoints;
                    }
                    //console.log($scope.prod);
                });
            }

        });

        $scope.add = function (item) {
            if(confirm("Add to cart?")){
                //item.approved = 0;
                cartFactory.add(item);
                console.log(cartFactory.getItems());
                $location.path('/home/store');
                //$rootScope.cartNumber = cartFactory.getNumber();
            }

        };

        $scope.isDescShown = true;
        $scope.toggleDesc = function(){
            $scope.isDescShown = !$scope.isDescShown;
        };

        $scope.isDetShown = true;
        $scope.toggleDet = function(){
            $scope.isDetShown = !$scope.isDetShown;
        };

        $scope.isTermShown = true;
        $scope.toggleTerm = function(){
            $scope.isTermShown = !$scope.isTermShown;
        };

    })
    .controller('LoginCtrl', function ($scope, userFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        //console.log($scope.loggedin);

    })
    .controller('CarouselCtrl', function ($scope, productFactory) {
        $scope.myInterval = 300;
        $scope.products = productFactory.getItems();
    })
    .controller('CartListCtrl', function ($scope, cartFactory, productFactory, userFactory,orderFactory,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartList = cartFactory.getItems();
        $scope.active_provider = productFactory.getActive();
        $scope.remove = function (item) {
            item.approved = 0;
            cartFactory.remove(item);
            console.log(cartFactory.getItems());
            $scope.cartList = cartFactory.getItems();
            //$rootScope.cartNumber = cartFactory.getNumber();
        };
        $scope.pesan = function(){
            if($scope.loggedin.user_id==0){
                alert("Anda harus login terlebih dahulu");
                $location.path('/login');
                return false;
            }
            if(confirm("pesan barang?")){
                orderFactory.add($scope.loggedin.user_id,$scope.total(),cartFactory.getItems()).then(function(data){
                    console.log(data);
                });
                cartFactory.cancel();
                $scope.cartList = cartFactory.getItems();
                $state.transitionTo('home.history', $state.$current.params, {
                    reload: true, inherit: true, notify: true
                });
            }
        };
        $scope.batal = function(){
            if(confirm("Batal pesan barang?")){
                cartFactory.cancel();
            }
        };
        $scope.total = function(){
            var harga = 0;
            $scope.itemNumber = 0;
            for(i=0;i<$scope.cartList.length;i++){
                harga += Math.floor($scope.cartList[i].product_price / $scope.active_provider.provider_point);
                $scope.itemNumber++;
            }
            return harga;
        }
    })
    .controller('SideMenuCtrl', function ($scope, cartFactory, userFactory, providerFactory,productFactory,$state) {
        /*must be declare in all controllers*/
        console.log($state);
        $scope.rubah = function(pid){
            //set rate dan point user
            productFactory.setActive(pid).then(function(){
                $state.go($state.current, {}, {reload: true});
            });

        };

        $scope.productsList = [];
        $scope.page = 0;
        $scope.limit = 1;
        $scope.noMoreData = false;
        $scope.search = function(){
            $state.transitionTo("home.store.search", {name:$scope.searchQuery}, {
                reload: false, inherit: true, notify: true
            });
        };

        $scope.pid = {value:0};
        $scope.loggedin = userFactory.getLoginUser();
        if($scope.loggedin.user_id>0){
            //$scope.pid.value = $scope.loggedin.providers[0].provider_id;
            //$scope.rubah($scope.loggedin.providers[0].provider_id);
            var active = productFactory.getActive();
            if(Object.keys(active).length==0){
                productFactory.setActive($scope.loggedin.providers[0].provider_id);
            }
            $scope.pid.value = active.provider_id;
        }

        $scope.cartItems = cartFactory.getItems();
        $scope.itemsNumber = function(){
            var jml = 0;
            angular.forEach($scope.cartItems,function(item,key){
                jml += item.number;
            });
            return jml;
        }
        /*end must be declare in all controllers*/

        productFactory.getCategories().then(function(rows){
            $scope.categories = rows;
        });

        $scope.tc = true;
        $scope.toggleCategories = function () {
            console.log('Toggle show categories')
            $scope.tc = !$scope.tc;
        }

        //$scope.categories = [
        //
        //    {
        //        name: 'Handphone & Tablet'
        //    },
        //    {
        //        name: 'Kesehatan & Kecantikan'
        //    },
        //    {
        //        name: 'Fashion'
        //    },
        //    {
        //        name: 'Elektronik Rumah Tangga'
        //    },
        //    {
        //        name: 'Mainan & Bayi'
        //    },
        //    {
        //        name: 'Komputer & Laptop'
        //    },
        //    {
        //        name: 'Kamera'
        //    },
        //    {
        //        name: 'JamTangan'
        //    },
        //    {
        //        name: 'Perhiasan'
        //    },
        //    {
        //        name: 'Peralatan Rumah Tangga'
        //    },
        //    {
        //        name: 'Otomotif'
        //    },
        //    {
        //        name: 'Groceries'
        //    },
        //    {
        //        name: 'Buku, Games & Musik'
        //    },
        //    {
        //        name: 'Olahraga & Outdoor'
        //    },
        //
        //]


    })
    .controller('AccountCtrl', function ($scope, userFactory,vendorFactory, $location, providerFactory,Upload,fileFactory,productFactory,$state,$localstorage) {
        //$scope.imageurl = "https://en.gravatar.com/userimage/88243764/f8ec3653f743fcb87bb78e723c6067f5.png";
        $scope.loggedin = userFactory.getLoginUser();
        $scope.login = function () {
            $scope.loginStatus = true;
            userFactory.login($scope.username, $scope.password).then(function(data){
                if (data.noerr == 100) {
                    $localstorage.setObject('user', userFactory.getLoginUser());
                    $scope.loggedin = userFactory.getLoginUser();

                    if($scope.loggedin.user_role=="provider"){
                        providerFactory.setProvider($scope.loggedin.user_id);
                    }else if($scope.loggedin.user_role=="customer"){
                        //set point n rate
                        //providerFactory.setPointRate($scope.loggedin.providers[0].provider_id);
                        productFactory.setActive($scope.loggedin.providers[0].provider_id);
                        //userFactory.setPoints($scope.loggedin.user_id,$scope.loggedin.providers[0].provider_id);
                    }else if($scope.loggedin.user_role=="vendor"){
                        vendorFactory.setVendor($scope.loggedin.user_id);
                    }

                    $state.transitionTo('home.store', $state.$current.params, {
                        reload: true, inherit: true, notify: true
                    });
                }else{
                    $scope.loginStatus = false;
                    $scope.loggedin = userFactory.getLoginUser();
                }
            });

        };
        $scope.logout = function(){
            userFactory.logout();
            productFactory.removeActive();
            vendorFactory.removeVendor();
            providerFactory.removeProvider();
            $state.transitionTo('home.store', $state.$current.params, {
                reload: true, inherit: true, notify: true
            });
        };
        $scope.register = function () {
            userFactory.addUser($scope.name,$scope.username,$scope.password,$scope.imagename,"customer",$scope.address,$scope.postcode,$scope.phone);
            $location.path('/home/store');
        };

        $scope.$watch('files', function () {
            fileFactory.upload($scope.files).then(function(data){
                setImage(data.name,data.url);
            });
        });

        setImage = function(name,uri){
            $scope.imagename = name;
            $scope.imageurl = uri;
        };
    })
    .controller('HistoryCtrl', function ($scope, userFactory,orderFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        orderFactory.getItems($scope.loggedin.user_id,false).then(function(rows){
            $scope.orderList = rows;
        });
    })
    .controller('HistoryDetailCtrl', function ($scope, userFactory,orderFactory,$stateParams) {
        $scope.loggedin = userFactory.getLoginUser();
        orderFactory.getItemById($stateParams.id,false).then(function(data){
            $scope.order = data;
            console.log(data);
        });
        $scope.total = function(){
            var harga = 0;
            $scope.itemNumber = 0;
            for(i=0;i<$scope.order.products.length;i++){
                harga += $scope.order.products[i].product_point * $scope.order.products[i].product_quantity;
                $scope.itemNumber += parseInt($scope.order.products[i].product_quantity);
            }
            return harga;
        }
    })
    .controller('RootMenuCtrl', function ($scope, userFactory, $location, providerFactory,Upload,urlFactory) {
        $scope.loggedin = userFactory.getLoginUser();
    })
;