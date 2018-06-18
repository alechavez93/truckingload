let fs = require("fs"),
    assert = require("assert"),
    truckstopCredentials = JSON.parse(fs.readFileSync('../Configs/truckstopCredentials.json', 'utf8')),
    configs = {truckstopCredentials: truckstopCredentials},
    TruckstopLoadAdapter = require("../Adapters/truckstopAdapter"),
    truckstopAdapter = new TruckstopLoadAdapter(configs),
    searchCriteriaId = undefined;

(function getSearchesTest(){
    truckstopAdapter.getSearches((searches) => {
        assert.notEqual(searches.length, 0);
        assert.notEqual(searches[0]["SearchCriteriaId"], undefined);
        searchCriteriaId = searches[0]["SearchCriteriaId"];
        // console.log(searches);
    });
})();

(function getLoadsTest(){
    if(searchCriteriaId) {
        let size = 5;
        truckstopAdapter.getLoads(searchCriteriaId, size, (loads) => {
            assert.equal(loads.length, size);
            assert.notEqual(loads[0]["Payment"], undefined);
            assert.notEqual(loads[0]["Miles"], undefined);
            console.log(loads);
        });
    }else{
        setTimeout(getLoadsTest, 100);
    }
})();


