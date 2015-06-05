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

            .state('store-product-list', {
                url: "/store-product-list",
                views: {
                    'main': {
                        templateUrl: "tpl/store/product-list.html",
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



        $urlRouterProvider.otherwise('/store-main');


    })