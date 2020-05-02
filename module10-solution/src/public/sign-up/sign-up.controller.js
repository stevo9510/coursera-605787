(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'MyInfoService'];
    function SignUpController(MenuService, MyInfoService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.menuItemNotValidated = true;

        // automatically devalidate field when the value changes, because we'll
        // want to revalidate it when it loses focus.  
        $ctrl.menuItemChanged = function (menuNumberInput) {
            menuNumberInput.$setValidity("invalid", false);
            $ctrl.menuItemNotValidated = true;
        };

        $ctrl.menuItemOnBlur = function (menuNumberInput) {
            var promise = MenuService.getMenuItemPromise($ctrl.user.menunumber);
            $ctrl.menuItemNotValidated = false;
            promise.then(function (response) {
                console.log("Menu Item Response: ", response.data);
                menuNumberInput.$setValidity("invalid", true);

            })
                .catch(function (error) {
                    menuNumberInput.$setValidity("invalid", false);
                });
        }

        $ctrl.submit = function () {
            MyInfoService.setUserInfo($ctrl.user);
            $ctrl.successfullySaved = true;
        };
    };

})();