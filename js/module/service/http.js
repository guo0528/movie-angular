(function(angular){
    var app = angular.module('httpApp',[]);
    app.service('JsonpService',[function(){
        this.getJsonp=function(url,params,func){
            var strUrl = url+'?';
            //遍历参数对象
            for(var key in params){
                strUrl+=key+'='+params[key]+'&';
            }
            //形成随机的json名字
            var jsonname = 'jsonp_'+Math.random().toString().substring(2);
            strUrl+='callback='+jsonname;
            //创建script标签
            var script = document.createElement('script');
            script.src = strUrl;
            //json方法
            //window.json = function(){}
            window[jsonname]=function(data){
                //通过回调函数将参数传递出去
                func(data);
                //销毁script标签
                document.body.removeChild(script);
            };
            document.body.appendChild(script);
        };
    }])
})(angular);