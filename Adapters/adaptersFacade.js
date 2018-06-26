let TruckstopAdapter = require("./truckstopAdapter");

class AdapterFacade{
    constructor(){
        this.truckstopAdapter = new TruckstopAdapter();
    }
}

module.exports = AdapterFacade;