/**
 * Created by goer on 5/21/15.
 */
angular.module('ProviderModule', ['ngFileUpload',"chart.js"])
    .controller('ProviderOrderCtrl', function ($scope, userFactory,orderFactory,providerFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        orderFactory.getOrders($scope.provider.provider_id).then(function(data){
            $scope.orderList = data;
            console.log(data);
        });

        $scope.reject = function (item) {
            //item.status = 2;
            //orderFactory.edit(item);
            orderFactory.approve(item.order_id,2);
            item.order_approved = 2;
            //console.log(orderFactory.getItems());
            //$scope.orderList = orderFactory.getItems();
        };
        $scope.approve = function (item) {
            //item.status = 1;
            //orderFactory.edit(item);
            //console.log(orderFactory.getItems());
            //$scope.orderList = orderFactory.getItems();
            orderFactory.approve(item.order_id,1);
            item.order_approved = 1;
        };
    })
    .controller('ProviderOrderReportCtrl', function ($scope, userFactory,orderFactory,providerFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        //console.log($scope.provider);
        $scope.totalPoint = 0;
        $scope.totalPrice = 0;
        orderFactory.getReport($scope.provider.provider_id).then(function(data){
            $scope.orderList = data;
            console.log(data);
            angular.forEach(data,function(val,i){
                $scope.totalPoint += val.product_point;
                $scope.totalPrice += val.product_price;
            });
        });
    })
    .controller('ProviderOrderChartCtrl', function ($scope, userFactory,orderFactory,providerFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        //console.log($scope.provider);
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Vendor A', 'Vendor B'];
        $scope.data = [
            [10000, 4000, 6000, 15000, 3500, 8000, 7500],
            [28000, 0, 12000, 4500, 8200, 9400, 7000]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.labels1 = ["Customer A", "Customer B", "Customer C"];
        $scope.data1 = [30000, 50000, 10000];
    })
    .controller('ProviderOrderDetailCtrl', function ($scope, userFactory,orderFactory,providerFactory,$stateParams) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();
        console.log($scope.provider);
        orderFactory.getItemById($stateParams.id,$scope.provider.provider_id).then(function(data){
            $scope.pesanan = data;
            //console.log($scope.pesanan);
        });

        $scope.reject = function () {
            orderFactory.approve($scope.pesanan.order_id,2);
            orderFactory.getItemById($stateParams.id,$scope.provider.provider_id).then(function(data){
                $scope.pesanan = data;
                //console.log($scope.pesanan);
            });
        };
        $scope.approve = function () {
            orderFactory.approve($scope.pesanan.order_id,1);
            orderFactory.getItemById($stateParams.id,$scope.provider.provider_id).then(function(data){
                $scope.pesanan = data;
                //console.log($scope.pesanan);
            });
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
        //$scope.products = productFactory.getItems();
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
        $scope.limit = 10;
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
    .controller('ProviderUsersPointsDetailCtrl', function ($scope, $http, providerFactory, userFactory, $stateParams,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();

        userFactory.getUserById($stateParams.id,$scope.provider.provider_id).then(function(data){
            data.provider_id = $scope.provider.provider_id;
            $scope.user=data;
            console.log(data);
        });

        $scope.update = function(user){
            if(confirm("Update data?")){
                userFactory.update(user);
            }
            $state.transitionTo('home.provider-users-point', $state.$current.params, {
                reload: true, inherit: true, notify: true
            });
        };

    })
    .controller('providerProductCtrl', function ($scope, userFactory, providerFactory,$stateParams,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();

        //console.log($state);

        $scope.productsList = [];
        $scope.page = 0;
        $scope.limit = 1;
        $scope.noMoreData = false;
        $scope.loadMore = function(){
            providerFactory.getProducts($stateParams.id,$scope.page).then(function(data){
                $scope.productsList = $scope.productsList.concat(data);
                if(data.length<$scope.limit){
                    $scope.noMoreData = true;
                }
                $scope.page++;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        };

    })
    .controller('providerListCtrl', function ($scope, userFactory, providerFactory,$stateParams,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        //$scope.provider = providerFactory.getProvider();

        $scope.providersList = [];
        $scope.page = 0;
        $scope.limit = 1;
        $scope.noMoreData = false;
        $scope.loadMore = function(){
            providerFactory.getProviders($scope.page).then(function(data){
                $scope.providersList = $scope.providersList.concat(data);
                if(data.length<$scope.limit){
                    $scope.noMoreData = true;
                }
                $scope.page++;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        };

    })
    .controller('searchProviderCtrl', function ($scope, userFactory, providerFactory,$stateParams,$state) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.provider = providerFactory.getProvider();


    })

    ;