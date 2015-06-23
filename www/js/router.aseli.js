/**
 * Created by goer on 5/20/15.
 */
angular.module('RouterMain',[])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            //.state('home', {
            //    url: "/home",
            //    //abstract:true,
            //    views: {
            //        'main': {
            //            templateUrl: "tpl/store/home.html",
            //        }
            //    },
            //})

            //.state('home.store', {
            //    url: "/store-main",
            //    views: {
            //        'content': {
            //            templateUrl: "tpl/store/main.html",
            //        },
            //        'left': {
            //            templateUrl: "tpl/store/main-menu.html",
            //        }
            //    },
            //})
            .state('store-main', {
                url: "/store-main",
                views: {
                    'main': {
                        templateUrl: "tpl/store/main.ori.html",
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
            .state('store-history', {
                url: "/store-history",
                views: {
                    'main': {
                        templateUrl: "tpl/store/history.html",
                    }
                },
            })
            .state('store-history/id/:id', {
                url: "/store-history/id/:id",
                views: {
                    'main': {
                        templateUrl: "tpl/store/history-detail.html",
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
            .state('vendor-order/id/:id', {
                url: "/vendor-order/id/:id",
                views: {
                    'main': {
                        templateUrl: "tpl/store/vendor-order-detail.html",
                    }
                },
            })
            .state('vendor-add', {
                url: "/vendor-add",
                views: {
                    'main': {
                        templateUrl: "tpl/store/vendor/vendor-add.html",
                    }
                },
            })
            .state('provider-order', {
                url: "/provider-order",
                views: {
                    'main': {
                        templateUrl: "tpl/store/provider-order.html",
                    }
                },
            })
            .state('provider-order/id/:id', {
                url: "/provider-order/id/:id",
                views: {
                    'main': {
                        templateUrl: "tpl/store/provider-order-detail.html",
                    }
                },
            })
            .state('provider-add', {
                url: "/provider-add",
                views: {
                    'content': {
                        templateUrl: "tpl/store/provider/provider-add.html",

                    }
                },
            })
            .state('provider-users-point', {
                url: "/provider-users-point",
                views: {
                    'main': {
                        templateUrl: "tpl/store/provider/provider-users-point.html",
                    }
                },
            })



        $urlRouterProvider.otherwise('/store-main');


    })