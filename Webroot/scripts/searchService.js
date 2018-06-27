app.factory("searchService", ["$http", function($http){
    return {
        getSearches: function(){
            return $http({
                method: "GET",
                url: "/api/loads-info/searches"
            }).then((response) => {
                return Promise.resolve(response.data);
            });
        }
    }
}]);