(function () {
    "use strict";

    angular.module('public')
        .service('MyInfoService', MyInfoService);

    function MyInfoService() {
        var service = this;
        var userInfo;

        service.getUserInfo = function () {
            return userInfo;
        };

        service.setUserInfo = function (info) {
            userInfo = info;
        };
    }

})();
