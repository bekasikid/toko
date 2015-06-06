/**
 * Created by goer on 5/20/15.
 */
angular.module('RouterMain',[])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider


            .state('store-main', {
                url: "/store-main",
                views: {
                    'main': {
                        templateUrl: "tpl/store/main.html",
                    }
                },
            })
            .state('store-cart', {
                url: "/store-cart",
                views: {
                    'main': {
                        templateUrl: "tpl/store/cart.html",
                    }
                },
            })
            .state('login', {
                url: "/login",
                views: {
                    'main': {
                        templateUrl: "tpl/store/login.html",
                    }
                },
            })

            .state('daftar', {
                url: "/daftar",
                views: {
                    'main': {
                        templateUrl: "tpl/store/daftar.html",
                    }
                },
            })

            .state('store-product/id/:id', {
                url: "/store-product/id/:id",
                views: {
                    'main': {
                        templateUrl: "tpl/store/product-detail.html",
                    }
                },
            })

            .state('store-product-detail', {
                url: "/store-product-detail",
                views: {
                    'main': {
                        templateUrl: "tpl/store/product-detail.html",
                    }
                },
            })
            .state('vendor-list', {
                url: "/vendor-list",
                views: {
                    'main': {
                        templateUrl: "tpl/store/vendor-list.html",
                    }
                },
            })
            .state('vendor-product/id/:id', {
                url: "/vendor-product/id/:id",
                views: {
                    'main': {
                        templateUrl: "tpl/store/vendor-product.html",
                    }
                },
            })
            .state('vendor-product-new', {
                url: "/vendor-product-new",
                views: {
                    'main': {
                        templateUrl: "tpl/store/vendor-product-new.html",
                    }
                },
            })
            .state('vendor-ordered', {
                url: "/vendor-ordered",
                views: {
                    'main': {
                        templateUrl: "tpl/store/vendor-ordered.html",
                    }
                },
            })



        $urlRouterProvider.otherwise('/store-main');


    })