(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService'];
  function SignUpController(MenuService) {
    var $ctrl = this;
    $ctrl.user = {};
    var menuService = MenuService;
    console.log('Menu Service: ', MenuService);

    $ctrl.submit = function () {
      try {
        var promise = menuService.getMenuItemPromise($ctrl.user.menunumber);

        promise.then(function (response) {
          console.log("We got something");
          // response.data
          $ctrl.menuNumberNotFound = false;
          $ctrl.successfullySaved = true;
        })
        .catch(function(error){
          console.log("We got nothing");
          $ctrl.menuNumberNotFound = true;
          $ctrl.successfullySaved = false;
        });
      } catch (Exception){
        console.log("We got exception");
      }
    };
  }

})();