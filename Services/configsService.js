let ConfigsRepository = require("../Storage/configsRepository");
let cachedConfigs = {
    truckStats: null,
    truckstopCredentials: null
};

/** This class is a singleton to access config data from anywhere */
class ConfigsService{

    /** This constructor makes sure there is only one instance */
    constructor(){
        if(! ConfigsService.instance){
            this.tsCredentialsUpdated = false;
            this.truckStatsUpdated = false;
            ConfigsService.instance = this;
        }

        return ConfigsService.instance;
    }

    /** Saves truckstop credentials to storage and marks cache as out of date */
    saveTsCredentials(configs, callback){
        this.tsCredentialsUpdated = false;
        ConfigsRepository.saveTsCredentials(configs, callback);
    }

    /** If the truckstop credentials are up to date in the cache reads it from the cache, else it
     *  reads credentials from storage and updates the cache for next read. */
    readTsCredentials(callback){
        if(this.tsCredentialsUpdated){
            callback(cachedConfigs.truckstopCredentials);
        }else{
            ConfigsRepository.readTsCredentials((truckstopCredentials) => {
                cachedConfigs.truckstopCredentials = truckstopCredentials;
                this.tsCredentialsUpdated = true;
                callback(truckstopCredentials);
            });
        }
    }

    /** Saves truck stats to storage and marks cache as out of date */
    saveTruckStats(configs, callback){
        this.truckStatsUpdated = false;
        ConfigsRepository.saveTruckStats(configs, callback);
    }

    /** If the truck stats are up to date in the cache reads it from the cache, else it
     *  reads truck stats from storage and updates the cache for next read. */
    readTruckStats(callback){
        if(this.truckStatsUpdated){
            callback(cachedConfigs.truckStats)
        }else{
            ConfigsRepository.readTruckStats((truckStats) => {
                cachedConfigs.truckStats = truckStats;
                this.truckStatsUpdated = true;
                callback(truckStats);
            })
        }
    }
}

/** Init instance and export it */
const instance = new ConfigsService();
module.exports = {
    instance: instance
};