let request = require("request");

class TruckstopLoadAdapter{

    /** Constructor method to initialize new instance of TruckstopLoadAdapter
     *  Params: configs instance (contains pre-loaded configuration info )*/
    constructor(configs){
        this._credentials = configs.truckstopCredentials;
        this.getSearchesEndpoint = "https://app.truckstop.com/Services/Searching.svc/GetLoadCounts";
        this.loadResultEndpoint = "https://app.truckstop.com/Services/Searching.svc/GetLoadResults";
    }

    /** Method gets all current searches for specified user from truckstop.com
     * Params: callback function (takes an array of searches)*/
    getSearches(callback) {
        let options = {
            method: "POST",
            url: this.getSearchesEndpoint,
            headers: {
                "Content-Type": "application/json; chartset=utf-8",
                "Cookie": this._credentials.authToken.key + "=" + this._credentials.authToken.value
            },
            body: {
                isUpdate: false,
                options: {}
            },
            json: true
        };
        console.info("Trying to get searches from truckstop.com");
        request(options, (error, response, body) => {
            console.info(`Response from server: ${response.statusCode}`);
            if (!error && response.statusCode === 200) {
                let searches = body["SearchingCounts"];
                for(let search of searches){
                    console.log(search["Description"] + " --> Id: " + search["SearchCriteriaId"]);
                }
                callback(searches);
            }else{
                console.error("Error: Failed to find any searches");
                callback([]);
            }
        });
    }

    /** Method gets all current searches for specified user from truckstop.com
     * Fields: searchId (number id for related search), size (max number of loads), callback function (takes an array of loads)*/
    getLoads(searchId, size, callback) {
        let options = {
            method: 'POST',
            url: this.loadResultEndpoint,
            headers: {
                "Content-Type": "application/json; chartset=utf-8",
                "Cookie": this._credentials.authToken.key + "=" + this._credentials.authToken.value
            },
            body: {
                isUpdate: false,
                options: {pageIndex: 1, size: size.toString(), orderBy: [{field: "Age", dir: "asc"}]},
                searchCriteriaId: Number.parseInt(searchId)
            },
            json: true
        };
        console.info("Trying to get loads from truckstop.com for search: "+searchId);
        request(options, (error, response, body) => {
            console.info(`Response from server: ${response.statusCode}`);
            if (!error && response.statusCode === 200) {
                let loads = body["SearchingResults"];
                console.log(`Found ${loads.length} loads`);
                callback(loads);
            }else{
                console.error(`Error: Failed to find any loads --> SearchId: ${searchId}`);
                callback([]);
            }
        });
    }
}

module.exports = TruckstopLoadAdapter;