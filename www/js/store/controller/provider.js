/**
 * Created by goer on 5/21/15.
 */
angular.module('ProviderModule', ['ngFileUpload'])
    .controller('ProviderOrderCtrl', function ($scope, userFactory,orderFactory,providerFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        console.log($scope.provider);
        orderFactory.getOrders($scope.provider.provider_id).then(function(data){
            $scope.orderList = data;
            console.log(data);
        });

        $scope.reject = function (item) {
            item.status = 2;
            orderFactory.edit(item);
            console.log(orderFactory.getItems());
            $scope.orderList = orderFactory.getItems();
        };
        $scope.approve = function (item) {
            item.status = 1;
            orderFactory.edit(item);
            console.log(orderFactory.getItems());
            $scope.orderList = orderFactory.getItems();
        };
    })
    .controller('ProviderOrderDetailCtrl', function ($scope, userFactory,orderFactory,$stateParams,providerFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        orderFactory.getItemById($stateParams.id,$scope.provider.provider_id).then(function(data){
            $scope.order = data;
        });

        $scope.total = function(){
            var harga = 0;
            for(i=0;i<$scope.order.products.length;i++){
                harga += $scope.order.products[i].product_point * $scope.order.products[i].product_quantity;
            }
            return harga;
        }
        $scope.reject = function () {
            $scope.order.status = 2;
            orderFactory.edit($scope.order);
            console.log(orderFactory.getItems());
            $scope.orderList = orderFactory.getItems();
        };
        $scope.approve = function () {
            $scope.order.status = 1;
            orderFactory.edit($scope.order);
            console.log(orderFactory.getItems());
            $scope.orderList = orderFactory.getItems();
        };
    })
    .controller('ProviderMenuCtrl', function ($scope, orderFactory, userFactory,productFactory, providerFactory) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        //$scope.orderItems = orderFactory.getItems();
        $scope.provider = providerFactory.getProvider();
        orderFactory.getOrders($scope.provider.provider_id).then(function(data){
            $scope.orderItems = data;
        });
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/


    })
    .controller('ProviderAddCtrl', function ($scope, providerFactory,userFactory,fileFactory,$location) {

        $scope.loggedin = userFactory.getLoginUser();
        $scope.providerAdd = false;
        $scope.register = function () {
            $scope.providerAdd = false;
            providerFactory.add($scope.name,$scope.username,$scope.password,$scope.imagename,$scope.address,$scope.phone,$scope.point).then(function(){
                $scope.providerAdd = true;
            });
            $location.path('/provider-add');
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
    .controller('ProviderUsersPointsCtrl', function ($scope, $http, providerFactory, userFactory, fileFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        fileFactory.setProvider($scope.provider);
        $scope.$watch('files', function () {
            fileFactory.uploadPoint($scope.files);
        });
        $scope.uploadPoint = function(){
            alert($scope.files);
            console.log($scope.files);
            fileFactory.uploadPoint($scope.files);
        };
        $scope.users = [];
        $scope.page = 0;
        $scope.limit = 1;
        $scope.noMoreData = false;
        $scope.loadMore = function(){
            var url = base+"index.php/api/users/usersByProvider/provider/"+$scope.provider.provider_id+"/limit/"+$scope.limit+"/page/"+$scope.page;
            //var url = base+"index.php/api/users/usersByProvider/provider/1/limit/"+$scope.limit+"/page/"+$scope.page;
            $http.get(url).success(function(rows){
                $scope.users = $scope.users.concat(rows);
                console.log($scope.users);
                if(rows.length<$scope.limit){
                    $scope.noMoreData = true;
                }
                $scope.page++;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
    })
    ;