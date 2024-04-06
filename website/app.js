var app = angular.module('myapp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:"views/home.html",
        controller:"homeCtrl"
    })
    .when('/news/:id',{
        templateUrl:"views/news.html",
        controller:"newsCtrl"
    })
    .when('/cart',{
        templateUrl:"views/cart.html",
        controller:"cartCtrl"
    })
    .when('/login',{
        templateUrl: "views/login.html",
        controller: "loginCtrl"
    })
    .otherwise({
        template:"404 khong tìm thấy trang"
    })
})

