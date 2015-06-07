/**
 * Created by goer on 5/21/15.
 */
angular.module('ProviderModule', [])
    .controller('ProviderOrderCtrl', function ($scope, userFactory,orderFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.orderList = orderFactory.getItems();
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
    .controller('ProviderOrderDetailCtrl', function ($scope, userFactory,orderFactory,$stateParams) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.order = orderFactory.getItemById($stateParams.id);
        $scope.total = function(){
            var harga = 0;
            for(i=0;i<$scope.order.products.length;i++){
                harga += $scope.order.products[i].point * $scope.order.products[i].number;
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
    .controller('ProviderMenuCtrl', function ($scope, orderFactory, userFactory,productFactory) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.orderItems = orderFactory.getItems();
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/


    })
    ;