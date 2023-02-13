class Scooter {
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }
  
  rent() {
    if (this.charge > 20 && !this.isBroken) {
      this.user = new User();
      this.station = null;
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge");
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair");
    }
  }
  
  dock(station) {
    this.user = null;
    this.station = station;
  }
  
  recharge() {
    let charge = this.charge;
    let rechargeInterval = setInterval(() => {
      if (charge === 100) {
        clearInterval(rechargeInterval);
        return;
      }
      charge++;
      console.log(`Scooter charge: ${charge}%`);
    }, 1000);
  }
  
  requestRepair() {
    this.isBroken = true;
    let repairInterval = setInterval(() => {
      this.isBroken = false;
      console.log("Repair completed");
      clearInterval(repairInterval);
    }, 5000);
  }
}

Scooter.nextSerial = 1;


module.exports = Scooter
