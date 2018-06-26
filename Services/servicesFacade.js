let TrucksService = require("./truckstopService");
let ConfigsService = require("./configsService");

class ServicesFacade{
    constructor(configs, adapterFacade){
        this.truckstopService = new TrucksService(configs, adapterFacade);
        this.configsService = ConfigsService.instance;
    }
}

module.exports = ServicesFacade;