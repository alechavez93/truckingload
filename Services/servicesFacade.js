let TrucksService = require("./truckstopService");

class ServicesFacade{
    constructor(configs, adapterFacade){
        this.truckstopService = new TrucksService(configs, adapterFacade);
    }
}

module.exports = ServicesFacade;