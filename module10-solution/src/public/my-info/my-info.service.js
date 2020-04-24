(function () {
    "use strict";

    angular.module('public')
        .service('MyInfoService', MyInfoService);

    function MyInfoService() {
        var service = this;
        var menuNumberPreference;

        service.getMenuNumberPreference = function () {
            return menuNumberPreference;
        };

        service.setMenuNumberPreference = function (menuNumberPref) {
            menuNumberPreference = menuNumberPref;
        };
    }

})();
