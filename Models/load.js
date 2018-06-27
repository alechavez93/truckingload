class Load{

    /** Creates a new instance of a load object
     *  This object encapsulates load information decoupled of load board site */
    constructor(loadInfo){
        this.payment = loadInfo.payment;
        this.miles = loadInfo.miles;
        this.detailsUrl = loadInfo.detailsUrl;
        this.brokerName = loadInfo.brokerName;
        this.pickupDate = loadInfo.pickupDate;
        this.timeListed = loadInfo.timeListed;
        this.emptyMiles = loadInfo.emptyMiles;
        this.route = loadInfo.route;
        this.calculateStats(loadInfo.mpg, loadInfo.costPerGal);
    }

    /** Calculates important load information regarding the financial aspects */
    calculateStats(mpg, costPerGal){
        this.payPerMile = (this.payment/this.miles).toFixed(2);
        this.emptyMileCost = ((this.emptyMiles/mpg) * costPerGal).toFixed(2);
        this.fuelCost = ((this.miles/mpg) * costPerGal).toFixed(2) + this.emptyMileCost;
        this.netProfit = (this.payment - this.fuelCost).toFixed(2);
        this.netProfitPerMile = (this.netProfit / this.miles).toFixed(2);
    }
}

module.exports = Load;