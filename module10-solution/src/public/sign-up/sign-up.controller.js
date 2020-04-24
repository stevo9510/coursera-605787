(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  // SignUpController.$inject = ['menuItems'];
  function SignUpController() {
    var $ctrl = this;
    $ctrl.user = {};

    $ctrl.submit = function () {
      console.log("Submit clicked");
      console.log("User: ", $ctrl.user)
    };

  }

})();