let Load = require("../Models/load");
let ConfigsService = require("../Services/configsService");

class TruckstopService{

    /** Creates a new instance of the adapter service */
    constructor(adaptersFacade){
        this.configsService = ConfigsService.instance;
        this.adaptersFacade = adaptersFacade;
        this.truckstopAdapter = this.adaptersFacade.truckstopAdapter;
    }

    /** Gets searches related to current user and organizes the info in summary */
    getSearches(callback){
        this.truckstopAdapter.getSearches((rawReaches) => {
            let searches = [];
            for(let rawSearch of rawReaches){
                searches.push({
                    totalLoads: rawSearch["Total"],
                    description: rawSearch["Description"],
                    searchCriteriaId: rawSearch["SearchCriteriaId"],
                    route: {
                        originCity: rawSearch["OriginCity"],
                        originState: rawSearch["OriginState"],
                        destinationCity: rawSearch["DestinationCity"],
                        destinationState: rawSearch["DestinationState"]
                    }
                });
            }
            callback(searches);
        });
    }

    /** Gets loads related to a search id and parses that information specific to truckstop into a generic format */
    getLoads(searchId, size, callback){
        this.configsService.readTruckStats((truckStats) => {
            this.truckstopAdapter.getLoads(searchId, size, (rawLoads) => {
                let loads = [];
                for(let rawLoad of rawLoads){
                    let loadInfo = {
                        mpg: truckStats.mpg,
                        costPerGal: truckStats.costPerGal,
                        payment: Number.parseFloat(rawLoad["Payment"]),
                        miles: Number.parseFloat(rawLoad["Miles"]),
                        detailsUrl: this.configsService.getTruckstopUrl() + rawLoad["DetailUrl"],
                        brokerName: rawLoad["CompanyName"],
                        pickupDate: rawLoad["PickUpDate"] + "/" + (new Date()).getFullYear(),
                        timeListed: rawLoad["AgeHover"],
                        emptyMiles: rawLoad["OriginDistance"],
                        route: {
                            originCity: rawLoad["OriginCity"],
                            originState: rawLoad["OriginState"],
                            destinationCity: rawLoad["DestinationCity"],
                            destinationState: rawLoad["DestinationState"]
                        }
                    };
                    loads.push(new Load(loadInfo));
                }
                callback(loads);
            });
        });
    }
}

module.exports = TruckstopService;