(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'MenuService', 'MyInfoService'];
    function SignUpController($scope, MenuService, MyInfoService) {
        var $ctrl = this;
        $ctrl.user = {};

        // automatically devalidate field when the value changes, because we'll
        // want to revalidate it when it loses focus.  
        $ctrl.menuItemChanged = function () {
            $scope.regForm.menunumber.$setValidity("invalid", false);
        };

        $ctrl.menuItemOnBlur = function () {
            var promise = MenuService.getMenuItemPromise($ctrl.user.menunumber);

            promise.then(function (response) {
                console.log("Menu Item Response: ", response.data);
                $scope.regForm.menunumber.$setValidity("invalid", true);
            })
                .catch(function (error) {
                    $scope.regForm.menunumber.$setValidity("invalid", false);
                });
        }

        $ctrl.submit = function () {
            MyInfoService.setUserInfo($ctrl.user);
            $ctrl.successfullySaved = true;
        };
    };

})();