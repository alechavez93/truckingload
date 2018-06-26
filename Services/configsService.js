let ConfigsRepository = require("../Storage/configsRepository");

class ConfigsService{
    constructor(){}

    saveTsCredentials(configs, callback){
        ConfigsRepository.saveTsCredentials(configs, callback);
    }

    readTsCredentials(callback){
        ConfigsRepository.readTsCredentials(callback);
    }

    saveTruckStats(configs, callback){
        ConfigsRepository.saveTruckStats(configs, callback);
    }

    readTruckStats(callback){
        ConfigsRepository.readTruckStats(callback);
    }
}

module.exports = ConfigsService;