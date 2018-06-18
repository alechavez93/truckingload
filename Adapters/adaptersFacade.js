let TruckstopAdapter = require("./truckstopAdapter");

class AdapterFacade{
    constructor(configs){
        this.truckstopAdapter = new TruckstopAdapter(configs);
    }
}

module.exports = AdapterFacade;