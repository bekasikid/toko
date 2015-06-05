/**
 * Created by goer on 5/21/15.
 */
angular.module('StoreModule', [])

    .controller('ProductListCtrl', function ($scope, cartFactory, userFactory, productFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.products = productFactory.getItems();
        $scope.add = function (item) {
            item.approved = 0;
            cartFactory.add(item);
            console.log(cartFactory.getItems());
            //$rootScope.cartNumber = cartFactory.getNumber();
        };
    })
    .controller('CartListCtrl', function ($scope, cartFactory, userFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartList = cartFactory.getItems();
        $scope.remove = function (item) {
            item.approved = 0;
            cartFactory.remove(item);
            console.log(cartFactory.getItems());
            $scope.cartList = cartFactory.getItems();
            //$rootScope.cartNumber = cartFactory.getNumber();
        };
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


    }).controller('AccountCtrl', function ($scope, userFactory, $location, providerFactory) {
        $scope.login = function () {
            $scope.loginStatus = userFactory.login($scope.username, $scope.password);
            if ($scope.loginStatus == true) {
                $location.path('/store-main');
            }
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
    }).controller('VendorMenuCtrl', function ($scope, cartFactory, userFactory, providerFactory, productFactory) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartItems = cartFactory.getItems();
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/

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


    });