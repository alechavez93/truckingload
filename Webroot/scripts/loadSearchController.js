app.controller("loadSearchController", ["$scope", "$log", "$http", "configService", function($scope, $log, $http, configService){

    $scope.searches = [];
    $scope.currentSearch = null;

    // Load the configurations
    configService.get()
    .then((configs) => {
        console.log(configs);
        $scope.truckStats = configs.truckStats;
        $scope.truckstopCredentials = configs.truckstopCredentials;
    });

    // Save the configurations
    $scope.saveConfigs = function () {
        configService.update({
            truckStats: $scope.truckStats,
            truckstopCredentials: $scope.truckstopCredentials
        });
    };

    $http({
        method: "GET",
        url: "/api/loads-info/searches"
    }).then((response) => {
        $scope.searches = response.data;
    }, (error) => {
        console.error("Could not get searches. Error: " + error);
    });
}]);

