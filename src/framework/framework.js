define(["angular", "src/services/auth", "src/services/servicePlugins"], function (angular, Auth, ServicePlugins) {
    var framework = angular.module("framework", ["ng"]);
    //注册权限服务
    framework.service("auth", Auth);

//    var auth = new Auth();
//    var plugins = new ServicePlugins();
//    var services = plugins.getServices(auth.getPrivileges());
//    console.log(services);

    //用于后边的懒加载文件
    framework.config(["$controllerProvider", "$compileProvider", function ($controllerProvider, $compileProvider) {
        framework.controllerProvider = $controllerProvider;
        framework.compileProvider = $compileProvider;
    }]);

    return framework;
});