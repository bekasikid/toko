/**
 * Created by goer on 5/21/15.
 */
angular.module('VendorModule', [])

    .controller('VendorListCtrl', function ($scope, userFactory,productFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.productsList = productFactory.getItems();
        $scope.remove = function (item) {
            item.approved = 0;
            cartFactory.remove(item);
            console.log(cartFactory.getItems());
            $scope.cartList = cartFactory.getItems();
            //$rootScope.cartNumber = cartFactory.getNumber();
        };
        $scope.add = function(){};
    })
    .controller('VendorOrderCtrl', function ($scope, userFactory,orderFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.orderList = orderFactory.getItems();
    })
    .controller('VendorOrderDetailCtrl', function ($scope, userFactory,orderFactory,$stateParams) {
        $scope.loggedin = userFactory.getLoginUser();
        $scope.order = orderFactory.getItemById($stateParams.id);
        $scope.total = function(){
            var harga = 0;
            for(i=0;i<$scope.order.products.length;i++){
                harga += $scope.order.products[i].point * $scope.order.products[i].number;
            }
            return harga;
        }
    })
    .controller('VendorMenuCtrl', function ($scope, orderFactory, userFactory,productFactory) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.orderItems = orderFactory.getItems();
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/


    })
    ;