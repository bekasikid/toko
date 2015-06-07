/**
 * Created by goer on 5/21/15.
 */
angular.module('StoreModule', ['angular-carousel'])

    .controller('ProductListCtrl', function ($scope, cartFactory, userFactory, productFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.myInterval = 300;
        $scope.carouselLists = productFactory.getItems();
        $scope.products = productFactory.getItems();
        $scope.add = function (item) {
            item.approved = 0;
            cartFactory.add(item);
            console.log(cartFactory.getItems());
        };
    })
    .controller('LoginCtrl', function ($scope, userFactory) {
        $scope.loggedin = userFactory.getLoginUser();
    })
    .controller('CarouselCtrl', function ($scope, productFactory) {
        $scope.myInterval = 300;
        $scope.products = productFactory.getItems();
    })
    .controller('CartListCtrl', function ($scope, cartFactory, userFactory,orderFactory) {
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
            if($scope.loggedin.id==0){
                alert("Anda harus login terlebih dahulu");
                $location.path('/login');
                return false;
            }
            if(confirm("pesan barang?")){
                var tgl = new Date();
                var month = str_pad(parseInt(tgl.getMonth())+1,2,"0","STR_PAD_LEFT");
                var dt = str_pad(parseInt(tgl.getDate()),2,"0","STR_PAD_LEFT");
                pesanan = {
                    id:orderFactory.getId(),
                    tgl:tgl.getFullYear()+"-"+month+"-"+dt,
                    proses:0,
                    tgl_proses : "",
                    delivery : "",
                    user : $scope.loggedin,
                    products : cartFactory.getItems(),
                    status:0,
                    total : $scope.total()
                };
                orderFactory.add(pesanan);
                console.log(orderFactory.getItems());
                cartFactory.cancel();
            }
        };
        $scope.batal = function(){
            if(confirm("Batal pesan barang?")){
                cartFactory.cancel();
            }
        };
        $scope.total = function(){
            var harga = 0;
            for(i=0;i<$scope.cartList.length;i++){
                harga += $scope.cartList[i].point * $scope.cartList[i].number;
            }
            return harga;
        }
    })
    .controller('SideMenuCtrl', function ($scope, cartFactory, userFactory, providerFactory) {
        /*must be declare in all controllers*/
        userFactory.setProviders(providerFactory.getProvider());
        userFactory.mapUserProviders();
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartItems = cartFactory.getItems();
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
    .controller('AccountCtrl', function ($scope, userFactory, $location, providerFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.login = function () {
            $scope.loginStatus = userFactory.login($scope.username, $scope.password);
            if ($scope.loginStatus == true) {
                $scope.loggedin = userFactory.getLoginUser();
                $location.path('/store-main');
            }
        };
        $scope.logout = function(){
            userFactory.logout();
            $location.path('/store-main');
        };
        $scope.register = function () {
            users = userFactory.getUsers();
            newUser = {
                id: (users.length + 1),
                name: $scope.name,
                email: $scope.username,
                password: $scope.password,
                image: "https://en.gravatar.com/userimage/88243764/f8ec3653f743fcb87bb78e723c6067f5.png",
                role: "customer",
                providers: []
            };
            provs = providerFactory.getProvider();
            var newProvs = [];
            angular.forEach(provs, function (prov, key) {
                newProv = {
                    id: prov.id,
                    point: 0
                };
                newProvs.push(newProv);
            });
            newUser.providers = newProvs;
            userFactory.addUser(newUser);
            console.log(userFactory.getUsers());
            $location.path('/store-main');
        };
    })
    .controller('productDetailCtrl', function ($scope, $stateParams, cartFactory, userFactory,productFactory,$location) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartItems = cartFactory.getItems();
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/
        //$scope.params = $routeParams;
        console.log($stateParams.id);
        $scope.product = productFactory.getItemById($stateParams.id);
        $scope.add = function (item) {
            if(confirm("Add to cart?")){
                item.approved = 0;
                cartFactory.add(item);
                console.log(cartFactory.getItems());
                $location.path('/store-main');
                //$rootScope.cartNumber = cartFactory.getNumber();
            }

        };

    })
    .controller('productVendorDetailCtrl', function ($scope, $stateParams, cartFactory, userFactory,productFactory,$location) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/
        //$scope.params = $routeParams;
        console.log($stateParams.id);
        $scope.product = productFactory.getItemById($stateParams.id);
        $scope.save = function (item) {
            if(confirm("Simpan Product?")){
                productFactory.rubah(item);
                console.log(productFactory.getItems());
                $location.path('/vendor-list');
                //$rootScope.cartNumber = cartFactory.getNumber();
            }

        };

        $scope.add = function (item) {
            if(confirm("Tambah Product?")){
                item.id = productFactory.getId();
                item.approved = 0;
                item.image = 'tpl/store/assets/images/recommendation/165x165xaneka-foto_fujifilm-x-m1-xc-16-50-silver_silver_full01.jpg.pagespeed.ic.gtUDucTVBO.jpg';
                productFactory.add(item);
                console.log(productFactory.getItems());
                $location.path('/vendor-list');
                //$rootScope.cartNumber = cartFactory.getNumber();
            }

        };

    })
    .controller('HistoryCtrl', function ($scope, userFactory,orderFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.orderList = orderFactory.getItems();
    })
    .controller('HistoryDetailCtrl', function ($scope, userFactory,orderFactory,$stateParams) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.order = orderFactory.getItemById($stateParams.id);
        $scope.total = function(){
            var harga = 0;
            for(i=0;i<$scope.order.products.length;i++){
                harga += $scope.order.products[i].point * $scope.order.products[i].number;
            }
            return harga;
        }
    });