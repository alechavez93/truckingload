let app = angular.module("LoadSearcher", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "views/loadSearch.html",
            controller: "loadSearchController"
        })
});