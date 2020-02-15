(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.items = "";

        $scope.checkIfTooMuch = function(){
            
            if($scope.items == undefined || $scope.items === ""){
                invalidInput();
            }
            else {
                var itemsArr = $scope.items.split(',');
                var filteredArr = itemsArr.filter(function (el){
                    return el != null && el.trim() != "";
                });

                $scope.emptyItemMessage = itemsArr.length != filteredArr.length 
                    ? "Note: Empty items not counted toward count." : "";

                /* This is a special case we're handling where the user entered
                    all commas, so item length was not 0.  Not specified how to
                    handle this in requirements, so I made something up that made sense.
                    (It did not make sense to say 'Enjoy' with 0 items :) ) 
                */
                if(filteredArr.length == 0){
                    allEmptyItems();
                }
                else if(filteredArr.length <= 3){
                    validInput("Enjoy!");
                } 
                else {
                    validInput("Too much!");
                }

                // Just for debugging/logging.
                console.log("Current Items: " + $scope.items);
                console.log("Non-Filtered Array");
                console.log(itemsArr);
                console.log("Filtered Array");
                console.log(filteredArr);
                console.log("Non-Filtered Count: " + itemsArr.length);
                console.log("Filtered Count: " + filteredArr.length);
            }
        };

        function invalidInput(){
            $scope.message = "Please enter data first";
            $scope.emptyItemMessage = "";
            $scope.messageStyle = "invalid-msg-text";
            $scope.inputStyle = "invalid-msg-input";
        }

        function validInput(msg){
            $scope.message = msg;
            $scope.messageStyle = "valid-msg-text";
            $scope.inputStyle = "valid-msg-input";
        }

        function allEmptyItems(){
            $scope.message = "All empty items were entered. Please enter non-empty items";
            $scope.messageStyle = "";
            $scope.inputStyle = "";
        }
    }
})();
