app.controller('homeCtrl', function($scope, $http, $rootScope){
    $scope.dsTT = [];
    $scope.dstintuc = {};
    $http.get('http://localhost:3000/news').then(
        function(res){
            $scope.dsTT = res.data;
        },
        function(res){
            alert('Can\'t get the database');
        }
    );
    $scope.dsSP = [];
    $http.get('http://localhost:3000/products').then(
        function(res){
            //Success
            $scope.dsSP = res.data;
        },
        function(res){
            alert('Can\'t get the database');
        }
    );
    $scope.showTinTuc = function(tt) {
        $scope.modal = tt;
    }
    
    $rootScope.addToCart = function(sp) {
        let inCart = false;
        $rootScope.cart.forEach(product => {
            if(product.id == sp.id) {
                inCart = true;
                product.quantity++;
            }
        });
        //SP đã có trong cart -> tăng số lượng
        if(!inCart){
            //SP chưa có trong cart -> thêm vào
            sp.quantity = 1;
            $rootScope.cart.push(sp);
        }
        localStorage.setItem('cart',JSON.stringify($rootScope.cart));
    }
})