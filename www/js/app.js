// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'RouterMain', 'StoreModule'])

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
    }).factory("cartFactory",function(){
        var items = [];
        var cartLists = {};

        cartLists.add = function(item){
            items.push(item);
        };
        cartLists.getItems = function(){
            return items;
        };
        cartLists.getNumber = function(){
            return items.length;
        };
        return cartLists;
    }).factory("userFactory",function(){
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
    }).factory("providerFactory",function(){
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
