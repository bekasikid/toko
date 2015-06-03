/**
 * Created by goer on 5/21/15.
 */
angular.module('StoreModule',[])

.controller('ProductListCtrl',function($scope,cartFactory,userFactory){
        $scope.products = [

            {
                image : 'tpl/store/assets/images/recommendation/165x165xaneka-foto_fujifilm-x-m1-xc-16-50-silver_silver_full01.jpg.pagespeed.ic.gtUDucTVBO.jpg',
                name : "camera 800",
                point : 99000
            },
            {
                image : 'tpl/store/assets/images/recommendation/165x165xleica-store-indonesia_leica-x-typ-113-silver-kamera-digital_full01.jpg.pagespeed.ic.ce4XEIcCBT.jpg',
                name : "camera 900",
                point : 56000
            },
            {
                image : 'tpl/store/assets/images/recommendation/165x165xmultidimensi_blackvue-sc-300-kamera-motor_full01.jpg.pagespeed.ic.1q0DRfS7UT.jpg',
                name : "camera 1000",
                point : 50000
            },
            {
                image : 'tpl/store/assets/images/recommendation/165x165xnavy-club_navy-club-8175-20-24-28-burgundy-koper-fiber_full01.jpg.pagespeed.ic.WcW60zfBHM.jpg',
                name : "tas perjalanan",
                point : 120000
            },
            {
                image : 'tpl/store/assets/images/recommendation/165x165xpanasonic-it-comm_panasonic-printer-multifungsi-kx-mb1520_full01.jpg.pagespeed.ic.5MwF2wI9WJ.jpg',
                name : "printer",
                point : 200000
            },
        ];
        $scope.add = function(item){
            cartFactory.add(item);
            console.log(cartFactory.getItems());
            $rootScope.cartNumber = cartFactory.getNumber();
        };


    })


    .controller('SideMenuCtrl',function($scope,cartFactory,userFactory,providerFactory){
        /*must be declare in all controllers*/
        userFactory.setProviders(providerFactory.getProvider());
        userFactory.mapUserProviders();
        $scope.loggedin = userFactory.getLoginUser();
        $scope.cartItems = cartFactory.getItems();
        /*end must be declare in all controllers*/

        $scope.tc = true;
        $scope,toggleCategories = function(){
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
                name : 'Handphone & Tablet'
            },
            {
                name : 'Kesehatan & Kecantikan'
            },
            {
                name : 'Fashion'
            },
            {
                name : 'Elektronik Rumah Tangga'
            },
            {
                name : 'Mainan & Bayi'
            },
            {
                name : 'Komputer & Laptop'
            },
            {
                name : 'Kamera'
            },
            {
                name : 'JamTangan'
            },
            {
                name : 'Perhiasan'
            },
            {
                name : 'Peralatan Rumah Tangga'
            },
            {
                name : 'Otomotif'
            },
            {
                name : 'Groceries'
            },
            {
                name : 'Buku, Games & Musik'
            },
            {
                name : 'Olahraga & Outdoor'
            },

        ]


    }).controller('AccountCtrl', function ($scope,userFactory,$location,providerFactory) {
        $scope.login = function(){
            $scope.loginStatus = userFactory.login($scope.username,$scope.password);
            if($scope.loginStatus==true){
                $location.path('/store-main');
            }
        };

        $scope.register = function(){
            users = userFactory.getUsers();
            newUser = {
                id : (users.length+1),
                name : $scope.name,
                email : $scope.username,
                password : $scope.password,
                image : "https://en.gravatar.com/userimage/88243764/f8ec3653f743fcb87bb78e723c6067f5.png",
                role : "customer",
                providers : [

                ]
            };
            provs = providerFactory.getProvider();
            var newProvs = [];
            angular.forEach(provs,function(prov,key){
                newProv = {
                    id : prov.id,
                    point : 0
                };
                newProvs.push(newProv);
            });
            newUser.providers = newProvs;
            userFactory.addUser(newUser);
            console.log(userFactory.getUsers());
            $location.path('/store-main');
        };
    });