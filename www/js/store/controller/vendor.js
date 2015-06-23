/**
 * Created by goer on 5/21/15.
 */
angular.module('VendorModule', ['ngFileUpload'])

    .controller('VendorListCtrl', function ($scope, userFactory,productFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        //$scope.productsList = productFactory.getItems();
        productFactory.getItems().then(function(data){
            $scope.productsList = data;
            console.log($scope.productsList);
        });
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
    .controller('VendorMenuCtrl', function ($scope, orderFactory, userFactory,productFactory,urlFactory) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.loggedin.imageurl = urlFactory.imageurl($scope.loggedin.image);
        $scope.orderItems = orderFactory.getItems();
        $scope.products = productFactory.getItems();
        /*end must be declare in all controllers*/


    })
    .controller('VendorAddCtrl', function ($scope, vendorFactory,userFactory,fileFactory,$location) {

        $scope.loggedin = userFactory.getLoginUser();
        $scope.vendorAdd = false;
        $scope.register = function () {
            $scope.vendorAdd = false;
            vendorFactory.add($scope.name,$scope.username,$scope.password,$scope.image,$scope.address,$scope.phone).then(function(){
                $scope.vendorAdd = true;
            });
            $location.path('/vendor-add');
        };

        $scope.$watch('files', function () {
            fileFactory.upload($scope.files);
        });
    })
    ;