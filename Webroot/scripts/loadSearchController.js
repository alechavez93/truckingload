app.controller("loadSearchController", ["$scope", "$log", "$http", "$location", function($scope, $log, $http, $location){

    $scope.searches = [];
    $scope.currentSearch = null;

    $http({
        method: "GET",
        url: "/api/loads-info/searches"
    }).then((response) => {
        $scope.searches = response.data;
    }, (error) => {
        console.error("Could not get searches. Error: " + error);
    });
}]);

