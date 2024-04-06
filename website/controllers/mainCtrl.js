app.controller('mainCtrl', function($scope, $rootScope){
    $rootScope.user = {};
    if(localStorage.getItem('user')){
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
    }
    $scope.logout = function(){
        localStorage.removeItem('user');
        $rootScope.user = {};
    }
    if(localStorage.getItem('cart')){
        $rootScope.cart = JSON.parse(localStorage.getItem('cart'));
    }
    else{
        $rootScope.cart = [];    
    }
});