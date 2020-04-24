(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService', 'MyInfoService'];
    function MyInfoController(MenuService, MyInfoService) {
        var $ctrl = this;
        $ctrl.favoriteMenuItem = null;

        var menuNumberPreference = MyInfoService.getMenuNumberPreference();
        if (menuNumberPreference) {
            console.log("Loaded Preference: ", menuNumberPreference);
            MenuService.getMenuItemPromise(menuNumberPreference)
                .then(function (response) {
                    console.log("Response Data: ", response.data);
                    $ctrl.favoriteMenuItem = response.data;
                });
        }
    }

})();