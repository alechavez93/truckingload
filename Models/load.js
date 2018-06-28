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
        this.emptyMileCost = this.round(((this.emptyMiles / mpg) * costPerGal), 2);
        this.fuelCost = this.round(((this.miles / mpg) * costPerGal) + this.emptyMileCost, 2);
        if(this.payment) {
            this.payPerMile = this.round((this.payment / this.miles), 2);
            this.netProfit = this.round((this.payment - this.fuelCost), 2);
            this.netProfitPerMile = this.round((this.netProfit / this.miles), 2);
        }else{
            this.payPerMile = "N/A";
            this.netProfit = "N/A";
            this.netProfitPerMile = "N/A";
        }
    }

    /** Rounds values */
    round(value, decimals) {
        if(!decimals){
            decimals = 2;
        }
        value = value * Math.pow(10, decimals);
        value = Math.round(value);
        value = value / Math.pow(10, decimals);
        return value;
    }
}

module.exports = Load;