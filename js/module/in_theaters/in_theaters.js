(function (angular) {
    var app = angular.module('mainApp.in_theaters', ['httpApp']);
    app.controller('in_theatersCtrl', ['$scope', '$route', '$routeParams', 'JsonpService', function ($scope,  $route, $routeParams,JsonpService) {
        $scope.title = "正在加载";
        $scope.subjects = [];
        //电影总数
        $scope.total = 0;
        //定义页面电影数
        $scope.pageCount = 5;
        //定义总页数
        $scope.pageTotal = 0;
        //当前页数
        $scope.page = parseInt($routeParams.page || 1);


        //点击上一页
        $scope.upPage = function () {
            if ($scope.page > 1) {
                $scope.page = $scope.page - 1;
                $route.updateParams({'page': $scope.page})
            }
        };

        //点击下一页
        $scope.downPage = function () {
            if ($scope.page < $scope.pageTotal) {
                $scope.page = $scope.page + 1;
                $route.updateParams({'page':$scope.page})
            }
        };

        var url = 'https://api.douban.com/v2/movie/'+$routeParams.type;
        var params = {
            'apikey': '00fa6c0654689a0202ef4412fd39ce06',
            start: ($scope.page - 1) * $scope.pageCount,
            count: $scope.pageCount,
            q:$routeParams.q
        };
        JsonpService.getJsonp(url, params, function (data) {
            $scope.title = data.title;
            $scope.subjects = data.subjects;
            $scope.total = data.total;
            //获取总页数
            $scope.pageTotal = Math.ceil(parseInt(data.total) / $scope.pageCount);
            //由于angular在异步请求时候需要通过apply去更新数据
            $scope.$apply();
        })
    }])
})(angular);