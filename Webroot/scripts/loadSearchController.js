app.controller("loadSearchController", ["$scope", "$log", "searchService", "configService", "loadService", function($scope, $log, searchService, configService, loadService){

    $scope.searches = [];
    $scope.currentSearch = {};
    $scope.brokers = [{ name: "All Brokers", checked: true }];

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
                $scope.filteredLoads = loads;
                $scope.brokers = [ { name: "All Brokers", checked: true } ];
                let brokerNames = [...new Set(loads.map( load => load.brokerName ))];
                brokerNames.forEach((name) => {
                    $scope.brokers.push({
                        name: name,
                        checked: false
                    });
                });
            });
    };

    // Applies filters for loads
    $scope.applyFilters = function () {
        $scope.filteredLoads = $scope.loads.filter(load => {
            let hasBroker = $scope.brokers[0].checked || $scope.brokers.find(broker =>{ return broker.name === load.brokerName });
            let inDesiredState = $scope.states[0].checked || $scope.states.find(state => { return state.code === load.route.destinationState.toUpperCase() });
            return hasBroker && inDesiredState;
        });
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

    $scope.states = [
        { name: "All States", code: "ALL", checked: true },
        { name: "Alabama", code: "AL", checked: false },
        { name: "Alaska", code: "AK", checked: false },
        { name: "Arizona", code: "AZ", checked: false },
        { name: "Arkansas", code: "AR", checked: false },
        { name: "California", code: "CA", checked: false },
        { name: "Colorado", code: "CO", checked: false },
        { name: "Connecticut", code: "CT", checked: false },
        { name: "Delaware", code: "DE", checked: false },
        { name: "District of Columbia", code: "DC", checked: false },
        { name: "Florida", code: "FL", checked: false },
        { name: "Georgia", code: "GA", checked: false },
        { name: "Hawaii", code: "HI", checked: false },
        { name: "Idaho", code: "ID", checked: false },
        { name: "Illinois", code: "IL", checked: false },
        { name: "Indiana", code: "IN", checked: false },
        { name: "Iowa", code: "IA", checked: false },
        { name: "Kansas", code: "KS", checked: false },
        { name: "Kentucky", code: "KY", checked: false },
        { name: "Louisiana", code: "LA", checked: false },
        { name: "Maine", code: "ME", checked: false },
        { name: "Maryland", code: "MD", checked: false },
        { name: "Massachusetts", code: "MA", checked: false },
        { name: "Michigan", code: "MI", checked: false },
        { name: "Minnesota", code: "MN", checked: false },
        { name: "Mississippi", code: "MS", checked: false },
        { name: "Missouri", code: "MO", checked: false },
        { name: "Montana", code: "MT", checked: false },
        { name: "Nebraska", code: "NE", checked: false },
        { name: "Nevada", code: "NV", checked: false },
        { name: "New Hampshire", code: "NH", checked: false },
        { name: "New Jersey", code: "NJ", checked: false },
        { name: "New Mexico", code: "NM", checked: false },
        { name: "New York", code: "NY", checked: false },
        { name: "North Carolina", code: "NC", checked: false },
        { name: "North Dakota", code: "ND", checked: false },
        { name: "Ohio", code: "OH", checked: false },
        { name: "Oklahoma", code: "OK", checked: false },
        { name: "Oregon", code: "OR", checked: false },
        { name: "Pennsylvania", code: "PA", checked: false },
        { name: "Rhode Island", code: "RI", checked: false },
        { name: "South Carolina", code: "SC", checked: false },
        { name: "South Dakota", code: "SD", checked: false },
        { name: "Tennessee", code: "TN", checked: false },
        { name: "Texas", code: "TX", checked: false },
        { name: "Utah", code: "UT", checked: false },
        { name: "Vermont", code: "VT", checked: false },
        { name: "Virginia", code: "VA", checked: false },
        { name: "Washington", code: "WA", checked: false },
        { name: "West Virginia", code: "WV", checked: false },
        { name: "Wisconsin", code: "WI", checked: false },
        { name: "Wyoming", code: "WY", checked: false }
    ];
}]);