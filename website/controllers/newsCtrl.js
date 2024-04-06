app.controller('newsCtrl', function ($scope, $http, $routeParams) {
    $scope.tintuc = {};
    $http.get(`http://localhost:3000/news/${$routeParams.id}`).then(
        function (res) {
            $scope.tintuc = res.data;
            $scope.tintuc.views++;
            $http.patch(`http://localhost:3000/news/${$routeParams.id}`,
                { views: $scope.tintuc.views });
        },
        function (res) {
            alert('Can\'t get the data');
        },
    );
    $scope.Date = function (ngay) {
        return new Date(ngay);
    }
    $scope.react = function (type) {
        $scope.tintuc[type]++;
        $http.patch(`http://localhost:3000/news/${$routeParams.id}`,
            { [type]: $scope.tintuc[type] });
    }
    $scope.comment = function () {
        $http.post(`http://localhost:3000/comments`, {
            "idNews": $routeParams.id,
            "content": $scope.content,
            "name": $scope.user.name,
            "idUser": $scope.user.id,
            // "date": new Date().toLocaleDateString('sv-SE'),
            "date": new Date().toISOString(),
        }).then(
            function (res) {
                $scope.content = '';
                $scope.loadComment();
            }
        )
    }
    $scope.dsBL = [];
    $scope.loadComment = function () {
        $http.get(`http://localhost:3000/comments?idNews/${$routeParams.id}`).then(
            function (res) {
                $scope.dsBL = res.data;
            }
        )
    }
    $scope.dsTT = [];
    $http.get(`http://localhost:3000/news/${$routeParams.id}`).then(
        function(res){
            $scope.dsTT = res.data.news;
        },
        function(res){
            alert('Can\'t get the database');
        }
    );

    $scope.loadComment();
    $scope.limit = 5;

    $scope.deleteComment = function (id) {
        $http.delete(`http://localhost:3000/comments/${id}`).then(
            function (res) {
                $scope.loadComment()
            }
        )
    };
})