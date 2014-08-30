/**
 * 提供菜单注册的所有服务，这里用于静态配置，或者通过后台接口进行查询
 */
define(function () {
    function PluginsConfig() {
        var plugins = [
            {
                "name": "home", //一级菜单名称
                "node": {
                    "state": "home",//菜单对应的state
                    "scenes": ["allinone"],    //菜单对应的场景
                    "rights": ["12"]     //菜单对应的权限
                },
                "children": [
                    {
                        "name": "home.er", //一级菜单名称
                        "node": {
                            "state": "home.er",//菜单对应的state
                            "scenes": ["allinone"],    //菜单对应的场景
                            "rights": ["122"]     //菜单对应的权限
                        }
                    },
                    {
                        "name": "home.er1", //一级菜单名称
                        "node": {
                            "state": "home.er1",//菜单对应的state
                            "scenes": ["allinone"],    //菜单对应的场景
                            "rights": ["123"]     //菜单对应的权限
                        }
                    }
                ]
            }
        ];

        this.getPlugins = function () {
            return plugins;
        };
    }
    PluginsConfig.getNode = function (configItem) {
        return {
            "name": configItem.name,
            "node": configItem.node,
            "children": []
        }
    };
    function ServicePlugins() {
        function hasRight(node, privilege) {
            if(!node) {
                return true;
            }
            if (node.scenes.indexOf(privilege.scense) >= 0 && node.rights.indexOf(privilege.right) >= 0) {
                return true;
            }
            return false;
        }

        function getPlugins(plugins, privileges) {
            //通过权限列表和在上面配置的plugins来重新生成一份plugins，用于最终的显示
            //这里采用广度优先算法，可以加快搜索速度
            var services = [];
            var tempPlugins = [];
            if (!privileges) {
                return plugins;
            }
            var i, j, length, size;
            for (i = 0, length = plugins.length; i < length; i++) {
                for (j = 0, size = privileges.length; j < size; j++) {
                    var configItem = PluginsConfig.getNode(plugins[i]);
                    var node = configItem.node;
                    if (hasRight(node, privileges[j])) {
                        services.push(configItem);
                        tempPlugins.push(plugins[i]);
                    }
                }
            }
            //处理children
            var children = [];
            for (i = 0, length = tempPlugins.length; i < length; i++) {
                children = tempPlugins[i].children;
                if (!children) {
                    continue;
                }
                services[i].children.push(getPlugins(children, privileges));
            }
            return services;
        }

        this.getServices = function (privileges) {
            var pluginsConfig = new PluginsConfig();
            return getPlugins(pluginsConfig.getPlugins(), privileges);
        };
    }

    return ServicePlugins;
});

