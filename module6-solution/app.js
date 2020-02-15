(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.items = "";
        $scope.message = "";
        $scope.emptyItemMessage = "";

        $scope.checkIfTooMuch = function(){
            if($scope.items === ""){
                $scope.message = "Please enter data first";
                $scope.emptyItemMessage = "";
            }
            else {
                var itemsArr = $scope.items.split(',');
                var filteredArr = itemsArr.filter(function (el){
                    return el != null && el.trim() != "";
                });

                $scope.emptyItemMessage = itemsArr.length != filteredArr.length 
                    ? "Empty items not counted toward count." : "";

                if(filteredArr.length <= 3){
                    $scope.message = "Enjoy!";
                } 
                else {
                    $scope.message = "Too much!";
                }

                console.log("Current Items: " + $scope.items);
                console.log("Non-Filtered Array");
                console.log(itemsArr);
                console.log("Filtered Array");
                console.log(filteredArr);
                console.log("Non-Filtered Count: " + itemsArr.length);
                console.log("Filtered Count: " + filteredArr.length);
            }
        };
    }
})();