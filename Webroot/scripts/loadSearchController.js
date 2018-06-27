app.controller("loadSearchController", ["$scope", "$log", "searchService", "configService", "loadService", function($scope, $log, searchService, configService, loadService){

    $scope.searches = [];
    $scope.currentSearch = {};

    // Load the configurations
    configService.get()
        .then((configs) => {
            $scope.truckStats = configs.truckStats;
            $scope.truckstopCredentials = configs.truckstopCredentials;
        });

    // Save the configurations
    $scope.saveConfigs = function () {
        configService.update({
            truckStats: $scope.truckStats,
            truckstopCredentials: $scope.truckstopCredentials
        })
        .then(() => {
            // Update searches after a change in configs
            getSearches();
        });
    };

    // Gets updated array of loads
    $scope.getLoads = function(){
        let searchId = $scope.currentSearch.searchCriteriaId;
        loadService.getLoads(searchId)
            .then((loads) => {
                $scope.loads = loads;
            })
    };

    // Gets updated array of searches
    let getSearches = function () {
        searchService.getSearches()
            .then((searches) => {
                $scope.searches = searches;
            });
    };



    // Init
    getSearches();
}]);

