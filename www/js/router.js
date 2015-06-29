/**
 * Created by goer on 5/20/15.
 */
angular.module('RouterMain',[])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('home', {
                url: '/home',
                abstract: true,
                views : {
                    'main' : {
                        templateUrl: 'tpl/home.html'
                    }
                }
            })
            .state('detail', {
                url: '/detail',
                abstract: true,
                views : {
                    'main' : {
                        templateUrl: 'tpl/home-detail.html'
                    }
                }
            })
            .state('home.store', {
                url: "/main",
                views: {
                    'content': {
                        templateUrl: "tpl/store/main.html"
                    }
                }
            })
            .state('home.cart', {
                url: "/cart",
                views: {
                    'content': {
                        templateUrl: "tpl/store/cart.html",
                    }
                },
            })
            .state('home.history', {
                url: "/history",
                views: {
                    'content': {
                        templateUrl: "tpl/store/history.html",
                    }
                },
            })
            .state('home.historyid', {
                url: "/history/id/:id",
                views: {
                    'content': {
                        templateUrl: "tpl/store/history-detail.html",
                    }
                },
            })
            .state('home.login', {
                url: "/login",
                views: {
                    'content': {
                        templateUrl: "tpl/store/login.html",
                    }
                },
            })

            .state('home.daftar', {
                url: "/daftar",
                views: {
                    'content': {
                        templateUrl: "tpl/store/daftar.html",
                    }
                },
            })

            .state('home.category', {
                url: "/category/id/:id",
                views: {
                    'content': {
                        templateUrl: "tpl/store/product-list.html",
                    }
                },
            })

            .state('home.product', {
                url: "/product/id/:id",
                views: {
                    'content': {
                        templateUrl: "tpl/store/product-detail.html",
                    }
                },
            })

            .state('home.store.search', {
                url: "/product/name/:name",
                views: {
                    'mainContent': {
                        templateUrl: "tpl/store/product-list.html",
                    }
                },
            })

            .state('home.vendor', {
                url: "/vendor",
                views: {
                    'content': {
                        templateUrl: "tpl/store/vendor/vendor-list.html",
                    }
                },
            })
            .state('home.vendor-product', {
                url: "/vendor-product/id/:id",
                views: {
                    'content': {
                        templateUrl: "tpl/store/vendor/vendor-product.html",
                    }
                },
            })
            .state('home.vendor-product-new', {
                url: "/vendor-product-new",
                views: {
                    'content': {
                        templateUrl: "tpl/store/vendor/vendor-product-new.html",
                    }
                },
            })
            .state('home.vendor-order', {
                url: "/vendor-order",
                views: {
                    'content': {
                        templateUrl: "tpl/store/vendor/vendor-ordered.html",
                    }
                },
            })
            .state('home.vendor-order-id', {
                url: "/vendor-order/id/:id",
                views: {
                    'content': {
                        templateUrl: "tpl/store/vendor/vendor-order-detail.html",
                    }
                },
            })
            .state('home.vendor-add', {
                url: "/vendor-add",
                views: {
                    'content': {
                        templateUrl: "tpl/store/vendor/vendor-add.html",
                    }
                },
            })
            .state('home.provider-order', {
                url: "/provider-order",
                views: {
                    'content': {
                        templateUrl: "tpl/store/provider/provider-order.html",
                    }
                },
            })
            .state('home.provider-order-id', {
                url: "/provider-order/id/:id",
                views: {
                    'content': {
                        templateUrl: "tpl/store/provider/provider-order-detail.html",
                    }
                },
            })
            .state('home.provider-add', {
                url: "/provider-add",
                views: {
                    'content': {
                        templateUrl: "tpl/store/provider/provider-add.html",

                    }
                },
            })
            .state('home.provider-users-point', {
                url: "/provider-users-point",
                views: {
                    'content': {
                        templateUrl: "tpl/store/provider/provider-users-point.html",
                    }
                },
            })



        $urlRouterProvider.otherwise('/home/main');


    });