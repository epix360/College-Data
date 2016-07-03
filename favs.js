var app = angular.module("savedFavs", []); 
app.controller("myCtrl", function($scope) {
    $scope.item = [];
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.item.indexOf($scope.addMe) == -1) {
            $scope.item.push($scope.addMe);
        } else {
            $scope.errortext = "Oops, something went wrong.";
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.item.splice(x, 1);
    } 
});

