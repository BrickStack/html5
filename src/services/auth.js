/*
 * 权限对象建模
 * right: 权限码
 * router: 页面路由
 * scense: 场景
 */
define(function () {
    function privilege(right, scense, state) {
        this.right = right;
        this.scense = scense;
        this.state = state;
    }

    //用于建立一个鉴权的模型
    function Auth($q, $http) {
        //该系统所使用的场景
        this.scense = "";
        //该用户的角色是什么
        this.role = "";
        //该用户对应的权限，通过后台查询回来的
        this.privileges = [];

        //查询是否有权限
        this.hasPrivilege = function (right, scense) {
            if (!scense) {
                scense = this.scense;
            }
            var privileges = this.privileges;
            var index = privileges.length;
            //如果未定义权限，那么默认就全部具有权限
            if (index === 0) {
                return true;
            }
            while (index--) {
                var item = privileges[index];
                if (!(item instanceof privilege)) {
                    continue;
                }
                if (item.right === right && item.scense === scense) {
                    return true;
                }
            }
            return false;
        };

        //查询权限列表
        this.getPrivileges = function () {
            var privileges = [];
            privileges.push(new privilege("12","allinone"));
            privileges.push(new privilege("122","allinone"));
            privileges.push(new privilege("124","allinone"));
            return privileges;
        };
    }

    Auth.$injector = ["$q", "$http"];
    return Auth;
});
