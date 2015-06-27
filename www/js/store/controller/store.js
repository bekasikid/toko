/**
 * Created by goer on 5/21/15.
 */
angular.module('StoreModule', ['angular-carousel','ngFileUpload'])

    .controller('headerCtrl', function ($scope, cartFactory, userFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cart = cartFactory.getItems();
    })
    .controller('ProductListCtrl', function ($scope, cartFactory, userFactory, productFactory, providerFactory,$ionicSlideBoxDelegate) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.myInterval = 300;

        productFactory.getPromo().then(function(data){
            $scope.carouselLists = data;
        });

        productFactory.getItems().then(function(data){
            $scope.products = data;
            $ionicSlideBoxDelegate.update();
        });

        $scope.point_rate = 1;
        providerFactory.setMinPointRate().then(function(row){
            $scope.point_rate = row.point;
        });

        $scope.add = function (item) {
            //item.approved = 0;
            cartFactory.add(item);
            console.log(cartFactory.getItems());
        };
    })
    .controller('productDetailCtrl', function ($scope, $stateParams, cartFactory, userFactory,productFactory,providerFactory,$location) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();

        //$scope.cartItems = cartFactory.getItems();
        //$scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/
        //$scope.params = $routeParams;
        //console.log($stateParams.id);
        //$scope.product = productFactory.getItemById($stateParams.id);
        $scope.point_rate = providerFactory.getPointRate();
        $scope.prod = {
            points : 0,
            topup:0
        };

        $scope.product = {
            product_point : 0
        };

        productFactory.getItemById($stateParams.id).then(function(row){
            $scope.product=row;
            $scope.product.product_point = Math.floor($scope.product.product_price/$scope.point_rate);
            $scope.prod.points = Math.floor($scope.product.product_price/$scope.point_rate);
        });

        $scope.$watch("prod.points",function(){
            $scope.prod.topup = ($scope.product.product_point - $scope.prod.points) * 2500;
            console.log($scope.prod);
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
    .controller('CartListCtrl', function ($scope, cartFactory, userFactory,orderFactory,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartList = cartFactory.getItems();
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
                harga += $scope.cartList[i].product_point * $scope.cartList[i].number;
                $scope.itemNumber += $scope.cartList[i].number;
            }
            return harga;
        }
    })
    .controller('SideMenuCtrl', function ($scope, cartFactory, userFactory, providerFactory,urlFactory) {
        /*must be declare in all controllers*/
        $scope.pid = {value:0};
        $scope.loggedin = userFactory.getLoginUser();
        if($scope.loggedin.user_id>0){
            $scope.pid.value = $scope.loggedin.providers[0].provider_id;
        }
        $scope.loggedin_sample = {providers : [
            {
                provider_id:1,
                provider_name:'Pertamina',
                point : 10000
            },
            {
                provider_id:2,
                provider_name:'Mandiri',
                point : 20000
            },
            {
                provider_id:3,
                provider_name:'BCA',
                point : 30000
            }
        ]};
        $scope.cartItems = cartFactory.getItems();
        $scope.itemsNumber = function(){
            var jml = 0;
            angular.forEach($scope.cartItems,function(item,key){
                jml += item.number;
            });
            return jml;
        }
        /*end must be declare in all controllers*/

        $scope.tc = true;
        $scope.toggleCategories = function () {
            console.log('Toggle show categories')
            $scope.tc = !$scope.tc;
        }
        $scope.providers = [

            {
                name: 'VISA',
                point: 990000

            },
            {
                name: 'BCA',
                point: 65660000

            },
            {
                name: 'MANDIRI',
                point: 545000

            },

        ]

        $scope.categories = [

            {
                name: 'Handphone & Tablet'
            },
            {
                name: 'Kesehatan & Kecantikan'
            },
            {
                name: 'Fashion'
            },
            {
                name: 'Elektronik Rumah Tangga'
            },
            {
                name: 'Mainan & Bayi'
            },
            {
                name: 'Komputer & Laptop'
            },
            {
                name: 'Kamera'
            },
            {
                name: 'JamTangan'
            },
            {
                name: 'Perhiasan'
            },
            {
                name: 'Peralatan Rumah Tangga'
            },
            {
                name: 'Otomotif'
            },
            {
                name: 'Groceries'
            },
            {
                name: 'Buku, Games & Musik'
            },
            {
                name: 'Olahraga & Outdoor'
            },

        ]


    })
    .controller('AccountCtrl', function ($scope, userFactory, $location, providerFactory,Upload,fileFactory,$state) {
        //$scope.imageurl = "https://en.gravatar.com/userimage/88243764/f8ec3653f743fcb87bb78e723c6067f5.png";
        $scope.loggedin = userFactory.getLoginUser();
        $scope.login = function () {
            $scope.loginStatus = true;
            userFactory.login($scope.username, $scope.password).then(function(data){
                if (data.noerr == 100) {
                    $scope.loggedin = userFactory.getLoginUser();
                    if($scope.loggedin.user_role=="provider"){
                        providerFactory.setProvider($scope.loggedin.user_id);
                    }
                    //$location.path('/home/store');
                    //$state.go('home.store');
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
            $state.transitionTo('home.store', $state.$current.params, {
                reload: true, inherit: true, notify: true
            });
        };
        $scope.register = function () {
            userFactory.addUser($scope.name,$scope.username,$scope.password,$scope.imagename,"customer");
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