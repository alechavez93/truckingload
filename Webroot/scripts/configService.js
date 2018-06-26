app.factory("configService", ["$http", function($http){
    return {
        get: function(){
            return $http({
                method: "GET",
                url: "/api/configs"
            }).then((response) => {
                return Promise.resolve(response.data);
            });
        },

        update: function(configs){
            return $http({
                method: "PUT",
                url: "/api/configs",
                data: {
                    truckStats: configs.truckStats,
                    truckstopCredentials: configs.truckstopCredentials
                }
            }).then((response) => {
                return Promise.resolve(response.data);
            });
        }
    }
}]);