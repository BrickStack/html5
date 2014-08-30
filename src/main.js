require.config({
    //http://makingmobile.org/docs/tools/requirejs-api-zh/#config
    "baseUrl": "../",
    "paths": {
        "jquery": "lib/jquery-2.1.1.min",
        "angular": "lib/angular-1.2.2/angular.min",
        "bootstrap": "lib/bootstrap-3.2.0/bootstrap.min"
    },
    "shim": {
        "jquery": {
            "exports": "$"
        },
        "angular": {
            "deps": ["jquery"],
            "exports": "angular"
        }
    },
    priority: ["angular"]
});
define(["angular", "src/framework/framework"], function(angular, framework) {
    angular.bootstrap($("html"), [framework.name]);
});
