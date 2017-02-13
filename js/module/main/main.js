(function (angular) {
    //创建主模块
    var app = angular.module('mainApp', ['ngRoute',
        'mainApp.in_theaters',
        'mainApp.subjects'
    ]);
    //路由表
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/movie/:type/:page?', {
                templateUrl: 'js/module/in_theaters/template.html',
                controller: 'in_theatersCtrl'
            })
            .when('/subject/:id', {
                templateUrl: 'js/module/subject/movieTemplate.html',
                controller: 'subjectCtrl'
            })
            .otherwise({
                redirectTo: '/movie/in_theaters/:page?'
            })
    }]);

    //创建控制器
    app.controller('searchCtrl', ['$scope','$route', function ($scope,$route) {
        $scope.searchText = '';
        $scope.search = function () {
            if($scope.searchText.length>0){
                //搜索电影
                $route.updateParams({'type':'search','q':$scope.searchText});
                $scope.searchText ="";
            }
        }
    }])
})(angular);