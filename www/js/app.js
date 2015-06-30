// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var base = "http://localhost/wincom/goer/toko-master/rest/";
//var uploadUrl = "http://localhost/wincom/goer/toko-master/rest/index.php/api/upload/upload";
//var uploadPointUrl = "http://localhost/wincom/goer/toko-master/rest/index.php/api/upload/uploadPoint";
var base = "http://52.0.13.11/tukarpoint/";
var uploadUrl = "http://52.0.13.11/tukarpoint/index.php/api/upload/upload";
var uploadPointUrl = "http://52.0.13.11/tukarpoint/index.php/api/upload/uploadPoint";
angular.module('starter', ['ionic','ngCordova', 'RouterMain', 'StoreModule', 'VendorModule', 'ProviderModule','ngFileUpload','chieffancypants.loadingBar', 'ngAnimate','ionic.service.core',
    'ionic.service.push',
    'ionic.service.deploy',])
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

        //cartLists.add = function(item){
        //    item.id = parseInt(item.product_id);
        //    console.log(item);
        //    var idx = items.indexOf(item);
        //    if(idx==-1){
        //        item.number=1;
        //        items.push(item);
        //    }else{
        //        items[idx].number +=1;
        //    }
        //    console.log(items);
        //};
        cartLists.add = function(item){
            item.id = parseInt(item.product_id);
            console.log(item);
            var isAdded = false;
            angular.forEach(items,function(row,key){
                if(row.id == item.id){
                    items[key].number += 1;
                    isAdded = true;
                }
            });
            if(!isAdded){
                item.number = 1;
                items.push(item);
            }
            console.log(items);
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
    .factory("orderFactory",function($http,$q,$window){
        var items = [];
        var orderLists = {};

        orderLists.add = function(userid,total,products){
            var def = $q.defer();
            ap = JSON.parse($window.localStorage['active_provider'] || '{}');
            $http.post(base+"index.php/api/orders/order",{
                user_id : userid,
                provider_id : ap.provider_id,
                total : total,
                products : products
            }).success(function(data){
                def.resolve(data);
            });
            return def.promise;
        };

        orderLists.getItemById = function(id,pid){
            var def = $q.defer();
            var uri = "";
            if(pid>0){
                uri = base+"index.php/api/orders/getOrderById/order/"+id+"/provider/"+pid;
            }else{
                uri = base+"index.php/api/orders/getOrderById/order/"+id;
            }
            $http.get(uri).success(function(data){
                //console.log(data);
                def.resolve(data);
            });
            return def.promise;
        };
        orderLists.remove = function(item){
            var idx = items.indexOf(item);
            items.splice(idx,1);
        };
        orderLists.edit = function(item){
            var idx = items.indexOf(item);
            items[idx]=item;
        };

        orderLists.approve = function(oid,approve){
            var def = $q.defer();
            var uri = base+"index.php/api/orders/orderApproved/order/"+oid+"/approve/"+approve;
            $http.get(uri).success(function(row){
                def.resolve(row);
            });
            return def.promise;
        }

        orderLists.getItems = function(uid){
            //return items;
            var def = $q.defer();
            $http.get(base+"index.php/api/orders/getOrder/user/"+uid).success(function(rows){
                def.resolve(rows);
            });
            return def.promise;
        };

        orderLists.getOrders = function(pid){
            //return items;
            var def = $q.defer();
            var uri = "";
            if(pid>0){
                uri = base+"index.php/api/orders/getAll/provider/"+pid;
            }else{
                uri = base+"index.php/api/orders/getAll";
            }
            $http.get(uri).success(function(rows){
                def.resolve(rows);
            });
            return def.promise;
        };

        orderLists.getReport = function(pid){
            //return items;
            var def = $q.defer();
            var uri = "";
            if(pid>0){
                uri = base+"index.php/api/orders/getOrder/provider/"+pid+"/approve/1";
            }else{
                uri = base+"index.php/api/orders/getOrder";
            }
            $http.get(uri).success(function(rows){
                def.resolve(rows);
            });
            return def.promise;
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
    .factory("productFactory",function($http,$q,$window){
        var items = [];
        var productLists = {};
        var default_provider = {provider_id:0};

        //productLists.add = function(item){
        //    items.push(item);
        //};

        productLists.setActive = function(pid){
            var def = $q.defer();
            $http.get(base+"index.php/api/providers/getProvider/id/"+pid).success(function(row){
                $window.localStorage["active_provider"] = JSON.stringify(row);
                //active_provider = row;
                def.resolve(row);
            });
            return def.promise;
        };
        productLists.getActive = function(){
            ap = JSON.parse($window.localStorage['active_provider'] || '{}');
            if(Object.keys(ap).length==0){
                return default_provider;
            }else{
                return ap;
            }

        };
        productLists.removeActive = function(){
            $window.localStorage.removeItem("active_provider");
            active_provider = {provider_id:0};
        };

        productLists.add = function(item){
            var def = $q.defer();
            $http.post(base+"index.php/api/products/product",{
                maker : item.maker,
                name : item.name,
                price : item.price,
                image : item.image,
                status : item.status,
                detail : item.detail,
                desc: item.desc,
                vendor: item.vendor_id,
                category : item.category.category_id
            }).success(function(data){
                def.resolve(data);
            });
            return def.promise;
        };

        productLists.rubah= function(item){
            var def = $q.defer();
            $http.post(base+"index.php/api/products/productUpdate",{
                id : item.product_id,
                maker : item.product_maker,
                name : item.product_name,
                price : item.product_price,
                image : item.product_image,
                status : item.product_status,
                detail : item.product_detail,
                desc: item.product_description,
                vendor: item.vendor_id,
                category : item.category.category_id
            }).success(function(data){
                def.resolve(data);
            });
            return def.promise;

        };
        productLists.getItems = function(page){
            var def = $q.defer();
            var limit = 6;
            //var uri = base+"index.php/api/products/getAll/limit/"+limit;
            var active_provider = this.getActive();
            var uri = base+"index.php/api/products/getProducts/limit/"+limit+"/page/"+page+"/provider/"+active_provider.provider_id;
            $http.get(uri).success(function(data){
                def.resolve(data);
            });
            //return items;
            return def.promise;
        };

        productLists.newItems = function(){
            var def = $q.defer();
            var limit = 6;
            //var uri = base+"index.php/api/products/getAll/limit/"+limit;
            var active_provider = this.getActive();
            var uri = base+"index.php/api/products/getProducts/limit/"+limit+"/new/1"+"/provider/"+active_provider.provider_id;
            $http.get(uri).success(function(data){
                def.resolve(data);
            });
            //return items;
            return def.promise;
        };

        productLists.searchItems = function(name,page){
            var def = $q.defer();
            var limit = 6;
            var active_provider = this.getActive();
            var uri = base+"index.php/api/products/getProducts/search/"+name+"/limit/"+limit+"/page/"+page+"/provider/"+active_provider.provider_id;
            $http.get(uri).success(function(data){
                def.resolve(data);
            });
            //return items;
            return def.promise;
        };

        productLists.categoryItems = function(cat,page){
            var def = $q.defer();
            var limit = 6;
            var active_provider = this.getActive();
            var uri = base+"index.php/api/products/getProducts/category/"+cat+"/limit/"+limit+"/page/"+page+"/provider/"+active_provider.provider_id;
            $http.get(uri).success(function(data){
                def.resolve(data);
            });
            //return items;
            return def.promise;
        };

        productLists.getPromo = function(){
            var def = $q.defer();
            $http.get(base+"index.php/api/promo/getAll").success(function(data){
                def.resolve(data);
            });
            return def.promise;
        };

        productLists.getCategories = function(){
            var def = $q.defer();
            $http.get(base+"index.php/api/products/categories").success(function(data){
                def.resolve(data);
            });
            return def.promise;
        };

        productLists.getNumber = function(){
            return items.length;
        };

        productLists.getItemById = function(id){
            var def = $q.defer();
            var active_provider = this.getActive();
            var uri = base+"index.php/api/products/getProduct/product/"+id+"/provider/"+active_provider.provider_id;
            $http.get(uri).success(function(row){
                def.resolve(row);
            });
            return def.promise;
        };

        productLists.getId = function(){
            return items.length+1;
        }
        return productLists;
    })
    .factory("userFactory",function($http,$q,$window){
        var login = {
            user_id : 0,
            user_name : "anonymous",
            user_email : "",
            user_image : "default.png",
            user_imageurl : base+"assets/images/default.png",
            user_role : "guest",
            providers : [

            ]
        };
        var providers = [];
        var users;
        var userObjects = {};
        var points = 0;

        userObjects.addUser = function(name,email,password,image,role,address,postcode,phone){
            var def = $q.defer();
            $http.post(base+"index.php/api/users/user",{
                name: name,
                email: email,
                password: password,
                image: image,
                role: "customer",
                address:address,
                postcode:postcode,
                phone:phone
            }).success(function(data){
               def.resolve(data);
            });
            return def.promise;
        };
        userObjects.getUsers = function(){
            return users;
        };
        userObjects.login = function(email,password){
            var def = $q.defer();
            $http.post(base+"index.php/api/users/login",{
                email : email,
                password : password
            }).success(function(row){
                if(row.noerr==100){
                    $window.localStorage['user'] = JSON.stringify(row.user);
                }
                def.resolve(row);
            });
            return def.promise;
        };
        userObjects.logout = function(){
            $window.localStorage.removeItem('user');
        };
        userObjects.getLoginUser = function(){
            user = JSON.parse($window.localStorage['user'] || '{}')
            if(Object.keys(user).length === 0){
                return login;
            }else{
                return user;
            }

        };
        //userObjects.setPoints = function(uid,pid){
        //    var def = $q.defer();
        //    $http.get(base+"index.php/api/users/getPoint/provider/"+pid+"/user/"+uid).success(function(row){
        //        def.resolve(row);
        //        points = row.point;
        //    });
        //    return def.promise;
        //};

        userObjects.getPoints = function(active_provider){
            var user = this.getLoginUser();
            var points = 0;
            angular.forEach(user.providers, function(val,i){
                if(active_provider.provider_id == val.provider_id){
                    points = val.point;
                }
            });
            return parseInt(points);
        };

        userObjects.getUserById = function(id,pid){
            var def = $q.defer();
            uri = base+"index.php/api/users/getUserById/user/"+id+"/provider/"+pid;
            $http.get(uri).success(function(data){
                def.resolve(data);
            });
            return def.promise;
        };

        userObjects.update = function(data_user){
            var row = {
                user_id : data_user.user_id,
                point : data_user.point,
                user_status : data_user.user_status,
                provider :data_user.provider_id
            };
            uri = base+"index.php/api/users/update";
            $http.post(uri,row);
        };

        return userObjects;
    })
    .factory("vendorFactory",function($http,$q,$window){

        var vendorObjects = {};
        var vendor = {};

        vendorObjects.add = function(nama,email,password,image,address,phone){
            var def = $q.defer();
            $http.post(base+"index.php/api/vendors/vendor",{
                name : nama,
                email : email,
                password : password,
                image : image,
                address : address,
                phone : phone
            }).success(function(row){
                def.resolve(row);
            });
            //console.log(def.promise);
            return def.promise;
        };

        vendorObjects.setVendor = function(uid){
            var def = $q.defer();
            $http.get(base+"index.php/api/vendors/getVendor/user/"+uid).success(function(row){
                def.resolve(row);
                $window.localStorage['vendor'] = JSON.stringify(row);
            });
            //console.log(def.promise);
            return def.promise;
        };

        vendorObjects.getVendor = function(){
            return JSON.parse($window.localStorage['vendor'] || '{}');
        };

        vendorObjects.removeVendor = function(){
            $window.localStorage.removeItem('vendor');
        }

        return vendorObjects;
    })
    .factory("providerFactory",function($http,$q,$window){
        var provider = {};
        var providerObjects = {};
        var pointRate = 1;

        providerObjects.setProvider = function(uid){
            //var def = $q.defer();
            $http.get(base+"index.php/api/providers/getByUserId/user/"+uid).success(function(row){
                $window.localStorage['provider'] = JSON.stringify(row);
            });
            //return def.promise;
        };

        providerObjects.getProvider = function(){
            return JSON.parse($window.localStorage['provider'] || '{}');
        };

        providerObjects.removeProvider = function(){
            $window.localStorage.removeItem('provider');
        };

        providerObjects.add = function(nama,email,password,img_thumb,address,phone,point){
            var def = $q.defer();
            $http.post(base+"index.php/api/providers/provider",{
                name : nama,
                email : email,
                password : password,
                img_thumb : img_thumb,
                address : address,
                phone : phone,
                point : point
            }).success(function(row){
                def.resolve(row);
            });
            return def.promise;
        };

        providerObjects.setMinPointRate = function(){
            var def = $q.defer();
            $http.get(base+"index.php/api/providers/getMinPoint").success(function(row){
                def.resolve(row);
                pointRate = row.point;
            });
            return def.promise;
        };

        providerObjects.setPointRate = function(pid){
            var def = $q.defer();
            $http.get(base+"index.php/api/providers/getPointRate/provider/"+pid).success(function(row){
                def.resolve(row);
                pointRate = row.point;
            });
            return def.promise;
        };

        providerObjects.getPointRate = function(){
            return pointRate;
        };

        return providerObjects;
    })
    .factory("urlFactory",function(){
        var urlObjects = {};

        urlObjects.baseurl = function(){
            return base;
        };
        urlObjects.siteurl = function(uri){
            return base+"index.php/"+uri;
        };
        urlObjects.imageurl = function(image){
            return base+"assets/images/"+image;
        }
        return urlObjects;
    })
    .factory("fileFactory",function(Upload,$q){
        var fileObjects = {};
        var provider;
        fileObjects.upload = function (files) {
            var def = $q.defer();
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: uploadUrl,
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        def.resolve(data);
                        //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                        //console.log(data);
                        //setImage(data.name,data.url);
                    });
                }
            }
            return def.promise;
        };

        fileObjects.setProvider = function(p){
            provider = p;
        };
        fileObjects.uploadPoint = function (files) {
            var def = $q.defer();
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: uploadPointUrl,
                        fields:{'provider':1},
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        def.resolve(data);
                    });
                }
            }
            return def.promise;
        };
        return fileObjects;
    })
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            remove : function(key){
                $window.localStorage.removeItem(key);
            }
        }
    }])
    .config(function($ionicConfigProvider,cfpLoadingBarProvider,$ionicAppProvider) {
        $ionicConfigProvider.views.maxCache(0);
        cfpLoadingBarProvider.includeSpinner = true;
        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server
            app_id: 'a99a070f',
            // The public API key all services will use for this app
            api_key: '29d662f0de4e8fa2b81326fdb8145af8b54d678d1cd27018',
            // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
            // gcm_id: 'YOUR_GCM_ID'
        });
    })

    .directive('ngMin', function() {
        return {
            restrict : 'A',
            require : ['ngModel'],
            compile: function($element, $attr) {
                return function linkDateTimeSelect(scope, element, attrs, controllers) {
                    var ngModelController = controllers[0];
                    scope.$watch($attr.ngMin, function watchNgMin(value) {
                        element.attr('min', value);
                        ngModelController.$render();
                    })
                }
            }
        }
    })
    .directive('ngMax', function() {
        return {
            restrict : 'A',
            require : ['ngModel'],
            compile: function($element, $attr) {
                return function linkDateTimeSelect(scope, element, attrs, controllers) {
                    var ngModelController = controllers[0];
                    scope.$watch($attr.ngMax, function watchNgMax(value) {
                        element.attr('max', value);
                        ngModelController.$render();
                    })
                }
            }
        }
    })
    .directive('currency', function () {
        return {
            require: 'ngModel',
            link: function(elem, $scope, attrs, ngModel){
                ngModel.$formatters.push(function(val){
                    return number_format(val,0,".",",")
                });
                ngModel.$parsers.push(function(val){
                    return val.replace(/^\$/, '')
                });
            }
        }
    })
;
