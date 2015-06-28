/**
 * Created by goer on 5/21/15.
 */
angular.module('VendorModule', ['ngFileUpload','ckeditor'])

    .controller('VendorListCtrl', function ($scope, userFactory,productFactory) {
        $scope.loggedin = userFactory.getLoginUser();
        //$scope.productsList = productFactory.getItems();
        productFactory.getItems().then(function(data){
            $scope.productsList = data;
            //console.log($scope.productsList);
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
    .controller('productVendorDetailCtrl', function ($scope, $stateParams, cartFactory, vendorFactory, userFactory,productFactory,$location,fileFactory) {
        /*must be declare in all controllers*/
        $scope.loggedin = userFactory.getLoginUser();
        $scope.vendor = vendorFactory.getVendor();
        //productFactory.getItems().then(function(data){
        //    $scope.products = data;
        //});
        /*end must be declare in all controllers*/
        //$scope.params = $routeParams;
        //console.log($stateParams.id);
        productFactory.getItemById($stateParams.id).then(function(data){
            $scope.product = data;
            console.log($scope.product);
        });
        $scope.image_update = 0;
        $scope.save = function (item) {
            if(confirm("Simpan Product?")){
                if($scope.image_update==1){
                    fileFactory.upload($scope.files).then(function(data){
                        item.product_image = data.name;
                        productFactory.rubah(item);
                        //console.log(productFactory.getItems());
                        $location.path('/home/vendor');
                    });
                }else{
                    alert("update");
                    productFactory.rubah(item);
                    $location.path('/home/vendor');
                }
            }
        };
        $scope.imagename = '';
        $scope.$watch('files', function () {
            if($scope.files!= undefined){
                $scope.image_update = 1;
                console.log($scope.files);
            }
        });
        $scope.upload = function(){
            console.log($scope.files);
            fileFactory.upload($scope.files).then(function(data){
                //setImage(data.name,data.url);
                $scope.imagename = data.name;
            });
        };
        $scope.add = function (item) {
            if(confirm("Tambah Product?")){
                //alert(item.desc);
                fileFactory.upload($scope.files).then(function(data){
                    item.image = data.name;
                    item.vendor_id = vendor.vendor_id;
                    //alert(item.desc);
                    //alert(item.detail);
                    productFactory.add(item);
                    //$location.path('/home/vendor');
                });

                //item.id = productFactory.getId();
                //item.approved = 0;

                //console.log(productFactory.getItems());

            }
        };

        // Called when the editor is completely ready.
        $scope.onReady = function () {
            // ...
        };

    })
    ;