app.controller('cartCtrl', function($scope, $http, $rootScope, $location){
    $scope.delete = function(index){
        $rootScope.cart.splice(index, 1);
        $scope.saveCart();
    };
    $scope.deleteAll = function() {
        $rootScope.cart = [];
        $scope.saveCart();
    };
    $scope.tongTien = function () {
        let sum = 0;
        if($rootScope.cart){
            $rootScope.cart.forEach(sp => {
                sum += sp.price * sp.quantity;
            });
        }
        return sum;
    };
    $scope.saveCart = function() {
        localStorage.setItem('cart', JSON.stringify($rootScope.cart));
    };
    $scope.purchase = function() {
        $http.post(`http://localhost:3000/orders`,{
            name: $scope.name,
            idUser: "-1",//Đơn hàng của khách là (-1), ngược lại lưu idUser
            phone: $scope.phone,
            address: $scope.address,
            products: $rootScope.cart,
            total: $scope.tongTien(),
            date: new Date().toLocaleString('sv-SE'),
            status: "order",
        }).then(
            function(res){
                $scope.deleteAll();
                document.querySelector('.btn-close').click();
                alert('Đặt hàng thành công !');
                $location.path('/');
            }
        )
    };
})