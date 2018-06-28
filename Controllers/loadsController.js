let truckstopService = null;

/** Class represents a Controller and all its routes within
  * Note: The controller should only access its corresponding service level methods */
class LoadsController{
    constructor(baseRoute, serviceFacade){
        this.controllerEndpoint = baseRoute + "/loads-info";
        this.routes = [];
        this.initializeRoutes();
        truckstopService = serviceFacade.truckstopService;
    }

    getRoutes(){
        return this.routes;
    }

    /** Method initializes all route objects with each field
     * Fields: type of request(method), permission group, endpoint string, and handler function*/
    initializeRoutes(){
        if(this.routes.length > 0) return;
        this.routes = [
            {
                method: "GET",
                permission: "STANDARD",
                endpoint: this.controllerEndpoint + "/searches",
                handler: getSearchesHandler
            },
            {
                method: "GET",
                permission: "STANDARD",
                endpoint: this.controllerEndpoint + "/loads",
                handler: getLoadsHandler
            }
        ];
    }
}


/** Here is where you define each handler for every route independently */
let getSearchesHandler = function(req, res){
    truckstopService.getSearches((searches) =>{
        res.send(searches);
    });
};

let getLoadsHandler = function(req, res){
    let searchId = req.query["searchId"];
    let size = req.query["size"] ? req.query["size"] : 100;
    truckstopService.getLoads(searchId, size, (loads) => {
        res.send(loads);
    });
};

module.exports = LoadsController;