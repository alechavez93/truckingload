app.factory("loadService", ["$http", function($http){
    return {
        getLoads: function(searchId){
            return $http({
                method: "GET",
                url: "/api/loads-info/loads?searchId=" + searchId
            }).then((response) => {
                return Promise.resolve(response.data);
            });
        }
    }
}]);