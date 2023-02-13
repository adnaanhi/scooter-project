class Scooter {
  // constructor initializes a Scooter instance with a station and default values for other properties
  constructor(station) {
    this.station = station; // assign station to the scooter
    this.user = null; // set user to null
    this.serial = Scooter.nextSerial++; // assign unique serial number and increment nextSerial
    this.charge = 100; // set the scooter's charge to 100%
    this.isBroken = false; // set the scooter's broken status to false
  }
  
  // rent method assigns a user to the scooter and sets its station to null
  rent() {
    // check if the scooter is not broken and has more than 20% charge
    if (this.charge > 20 && !this.isBroken) {
      this.user = new User(); // assign a new User instance to the scooter's user property
      this.station = null; // set the scooter's station to null
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge"); // throw an error if the scooter's charge is less than or equal to 20%
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair"); // throw an error if the scooter is broken
    }
  }
  
  // dock method sets the scooter's station to the specified station and user to null
  dock(station) {
    this.user = null; // set the scooter's user to null
    this.station = station; // assign the specified station to the scooter's station property
  }
  
  // recharge method increases the scooter's charge by 1% every second until it reaches 100%
  recharge() {
    let charge = this.charge; // store the scooter's charge in a local variable
    let rechargeInterval = setInterval(() => {
      // check if the charge has reached 100%
      if (charge === 100) {
        clearInterval(rechargeInterval); // clear the interval if the charge is 100%
        return;
      }
      charge++; // increase the charge by 1%
      console.log(`Scooter charge: ${charge}%`); // log the updated charge
    }, 1000);
  }
  
  // requestRepair method sets the scooter's broken status to true and logs "Repair completed" after 5 seconds
  requestRepair() {
    this.isBroken = true; // set the scooter's broken status to true
    let repairInterval = setInterval(() => {
      this.isBroken = false; // set the scooter's broken status to false after 5 seconds
      console.log("Repair completed"); // log that the repair is completed
      clearInterval(repairInterval); // clear the interval
    }, 5000);
  }
}

// set nextSerial property to 1 for the first scooter
Scooter.nextSerial = 1;

module.exports = Scooter
