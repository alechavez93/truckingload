let configsService = null;

/** Class represents a Controller and all its routes within
 * Note: The controller should only access its corresponding service level methods */
class ConfigsController{
    constructor(baseRoute, serviceFacade){
        this.controllerEndpoint = baseRoute + "/configs";
        this.routes = [];
        this.initializeRoutes();
        configsService = serviceFacade.configsService;
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
                endpoint: this.controllerEndpoint,
                handler: getConfigs
            },
            {
                method: "PUT",
                permission: "STANDARD",
                endpoint: this.controllerEndpoint,
                handler: updateConfigs
            }
        ];
    }
}


/** Here is where you define each handler for every route independently */
let getConfigs = function(req, res){
    let configsData = {
        truckStats: {},
        truckstopCredentials: {}
    };

    configsService.readTruckStats((truckStats) => {
        configsData.truckStats = truckStats;
        configsService.readTsCredentials((truckstopCredentials) => {
            configsData.truckstopCredentials = truckstopCredentials;
            res.send(configsData);
        })
    })
};

let updateConfigs = function(req, res){
    if(req.body.truckStats) {
        ConfigsController.saveTruckStats(req.body.truckStats, () => {});
    }

    if(req.body.truckstopCredentials) {
        ConfigsController.saveTsCredentials(req.body.truckstopCredentials, () => {})
    }

    if(!req.body.truckStats || !req.body.truckstopCredentials){
        res.send(400, "Invalid request body");
    }else{
        res.send(200);
    }
};

module.exports = ConfigsController;