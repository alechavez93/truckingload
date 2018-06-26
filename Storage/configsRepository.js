let fs = require("fs");
let path = require("path");
let setupsPath = path.join(__dirname, "..", "Configs", "/");
let tsCredentialsPath = path.join(setupsPath, "truckstopCredentials.json");
let truckStatsPath = path.join(setupsPath, "truckStats.json");

 class ConfigsRepository{

    static saveTsCredentials(configs, callback){
        fs.open(tsCredentialsPath, "wx", function (err, fd) {
            fs.writeFile(tsCredentialsPath, JSON.stringify(configs), (err)=>{
                callback(err);
            });
        });
    }

    static readTsCredentials(callback){
        fs.readFile(tsCredentialsPath, 'utf8', (err, data)=>{
            let testSetup = JSON.parse(data);
            callback(testSetup);
        });
    }

     static saveTruckStats(configs, callback){
         fs.open(truckStatsPath, "wx", function (err, fd) {
             fs.writeFile(truckStatsPath, JSON.stringify(configs), (err)=>{
                 callback(err);
             });
         });
     }

     static readTruckStats(callback){
         fs.readFile(truckStatsPath, 'utf8', (err, data)=>{
             let testSetup = JSON.parse(data);
             callback(testSetup);
         });
     }
}

module.exports = ConfigsRepository;