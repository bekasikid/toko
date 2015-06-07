// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'RouterMain', 'StoreModule', 'VendorModule', 'ProviderModule'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .factory("cartFactory",function(){
        var items = [];
        var cartLists = {};

        cartLists.add = function(item){
            var idx = items.indexOf(item);
            if(idx==-1){
                item.number=1;
                items.push(item);
            }else{
                items[idx].number +=1;
            }

        };
        cartLists.remove = function(item){
            var idx = items.indexOf(item);
            items.splice(idx,1);
        };
        cartLists.cancel = function(){
            items = [];
        };
        cartLists.getItems = function(){
            return items;
        };
        cartLists.getNumber = function(){
            return items.length;
        };
        return cartLists;
    })
    .factory("orderFactory",function(){
        var items = [];
        var orderLists = {};

        orderLists.add = function(item){
            var idx = items.indexOf(item);
            if(idx==-1){
                item.number=1;
                items.push(item);
            }else{
                items[idx].number +=1;
            }

        };
        orderLists.getItemById = function(id){
            var row = {};
            angular.forEach(items,function(item,key){
                if(item.id==id){
                    row=item;
                }
            });
            return row;
        };
        orderLists.remove = function(item){
            var idx = items.indexOf(item);
            items.splice(idx,1);
        };
        orderLists.edit = function(item){
            var idx = items.indexOf(item);
            items[idx]=item;
        };
        orderLists.getItems = function(){
            return items;
        };
        orderLists.getId = function(){
            return items.length+1;
        }
        orderLists.history = function(uid){
            var lists = [];
            angular.forEach(items,function(item,key){
                if(item.user.id==uid){
                    lists.push(item);
                }
            });
            return lists;
        }
        return orderLists;
    })
    .factory("productFactory",function(){
        var items = [

            {
                id:1,
                image : 'tpl/store/assets/images/recommendation/165x165xaneka-foto_fujifilm-x-m1-xc-16-50-silver_silver_full01.jpg.pagespeed.ic.gtUDucTVBO.jpg',
                name : "camera 800",
                point : 99000,
                status : 1,
                approved : 0
            },
            {
                id:2,
                image : 'tpl/store/assets/images/recommendation/165x165xleica-store-indonesia_leica-x-typ-113-silver-kamera-digital_full01.jpg.pagespeed.ic.ce4XEIcCBT.jpg',
                name : "camera 900",
                point : 56000,
                status : 1,
                approved : 0
            },
            {
                id:3,
                image : 'tpl/store/assets/images/recommendation/165x165xmultidimensi_blackvue-sc-300-kamera-motor_full01.jpg.pagespeed.ic.1q0DRfS7UT.jpg',
                name : "camera 1000",
                point : 50000,
                status : 1,
                approved : 0
            },
            {
                id:4,
                image : 'tpl/store/assets/images/recommendation/165x165xnavy-club_navy-club-8175-20-24-28-burgundy-koper-fiber_full01.jpg.pagespeed.ic.WcW60zfBHM.jpg',
                name : "tas perjalanan",
                point : 120000,
                status : 1,
                approved : 0
            },
            {
                id:5,
                image : 'tpl/store/assets/images/recommendation/165x165xpanasonic-it-comm_panasonic-printer-multifungsi-kx-mb1520_full01.jpg.pagespeed.ic.5MwF2wI9WJ.jpg',
                name : "printer",
                point : 200000,
                status : 1,
                approved : 0
            },
        ];
        var productLists = {};

        productLists.add = function(item){
            items.push(item);
        };
        productLists.rubah= function(newItem){
            //items.push(item);
            angular.forEach(items,function(item,key){
                if(item.id==newItem.id){
                    //row=item;
                    items[key] = newItem;
                }
            });

        };
        productLists.getItems = function(){
            return items;
        };
        productLists.getNumber = function(){
            return items.length;
        };
        productLists.getItemById = function(id){
            var row = {};
            angular.forEach(items,function(item,key){
                if(item.id==id){
                    row=item;
                }
            });
            return row;
        };
        productLists.getId = function(){
            return items.length+1;
        }
        return productLists;
    })
    .factory("userFactory",function(){
        var login = {
            id : 0,
            name : "anonymous",
            email : "",
            image : "https://en.gravatar.com/userimage/88243764/f8ec3653f743fcb87bb78e723c6067f5.png",
            role : "guest",
            providers : [

            ]
        };
        var providers = [];
        var users = [
            {
                id : 1,
                name : "Ainul",
                email : "ainul.top@gmail.com",
                image : "https://en.gravatar.com/userimage/88243764/ad74df7c8d39899c4207699d66234b94.png",
                password : "apaansih",
                role : "customer",
                providers : [
                    {
                        id : 1,
                        point : 1000000
                    },
                    {
                        id : 2,
                        point : 500000
                    }
                ]
            },
            {
                id : 2,
                name : "Guruh",
                email : "fonetix@gmail.com",
                image : "https://en.gravatar.com/userimage/88243764/ad74df7c8d39899c4207699d66234b94.png",
                password : "guruhpwd",
                role : "customer",
                providers : [
                    {
                        id : 1,
                        point : 400000
                    },
                    {
                        id : 2,
                        point : 2000000
                    }
                ]
            },
            {
                id : 3,
                name : "Vendor 1",
                email : "vendor",
                image : "https://en.gravatar.com/userimage/88243764/ad74df7c8d39899c4207699d66234b94.png",
                password : "apaansih",
                role : "vendor"
            },
            {
                id : 3,
                name : "Provider 1",
                email : "provider",
                image : "https://en.gravatar.com/userimage/88243764/ad74df7c8d39899c4207699d66234b94.png",
                password : "apaansih",
                role : "provider"
            }
        ];
        var userObjects = {};

        userObjects.addUser = function(item){
            users.push(item);
        };
        userObjects.getUsers = function(){
            return users;
        };
        userObjects.login = function(email,password){
            isvalid = false;
            angular.forEach(users, function(user,key){
                if(user.email==email){
                    if(user.password==password){
                        alert("anda telah login");
                        login = user;
                        isvalid = true;
                        //mapUserProviders();
                    }
                }
            });
            return isvalid;
        };
        userObjects.logout = function(){
            login = {
                id : 0,
                name : "anonymous",
                email : "",
                image : "https://en.gravatar.com/userimage/88243764/f8ec3653f743fcb87bb78e723c6067f5.png",
                role : "guest",
                providers : [

                ]
            };
        };
        userObjects.getLoginUser = function(){
            return login;
        };
        userObjects.setProviders = function(provs){
            providers = provs;
            this.mapUserProviders();
        };
        userObjects.mapUserProviders = function(){
            var newProvs = [];
            angular.forEach(login.providers,function(logprov,key){
                angular.forEach(providers,function(prov,keyn){
                    if(logprov.id==prov.id){
                        logprov.name = prov.name;
                    }
                });
                newProvs.push(logprov);
            });
            login.providers = newProvs;
            console.log(login);
        }
        return userObjects;
    })
    .factory("providerFactory",function(){
        var providers = [
            {
                id : 1,
                name : "Pertamina",
                email : "example@pertamina.com",
                password : "pertaminapwd"
            },
            {
                id : 2,
                name : "Mandiri",
                email : "example@mandiri.co.id",
                password : "mandiripwd"
            }
        ];
        var providerObjects = {};

        providerObjects.addProvider = function(item){
            providers.push(item);
        };
        providerObjects.getProvider = function(){
            return providers;
        };
        return providerObjects;
    })
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
    });
