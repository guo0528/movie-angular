//电影详情页面
(function(angular){
    var app = angular.module('mainApp.subjects',['httpApp']);
    app.controller('subjectCtrl',['$scope','$routeParams','JsonpService',function($scope,$routeParams,JsonpService){
        $scope.subject = {};
        //通过$routeParams获取到传递过来的id
        $scope.test=$routeParams;
        //根据传递过来id拼接url
        var url='https://api.douban.com/v2/movie/subject/'+$routeParams.id;
        var params={
           'apikey':'00fa6c0654689a0202ef4412fd39ce06'
        };
        JsonpService.getJsonp(url,params,function(data){
            $scope.subject=data;
            $scope.$apply();
        })
    }])
})(angular);