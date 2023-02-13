const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // constructor function that initializes the `stations` object and the `registeredUsers` object
  constructor() {
    // an object with three properties named "Station 1", "Station 2", and "Station 3", each having an empty array as its value
    this.stations = {
      "Station 1": [],
      "Station 2": [],
      "Station 3": []
    };
    // an empty object
    this.registeredUsers = {};
  }

  // a method that registers a new user
  registerUser(username, password, age) {
    // checks if the user has already been registered or is under 18
    if (this.registeredUsers[username] || age < 18) {
      // throws an error if either condition is met
      throw "already registered or too young to register";
    } else {
      // creates a new instance of the `User` class with the given `username` and `password`
      this.registeredUsers[username] = new User(username, password);
      // logs a message indicating that the user has been registered
      console.log(`${username} has been registered.`);
      // returns the newly created `User` instance
      return this.registeredUsers[username];
    }
  }

  // a method that logs in an existing user
  loginUser(username, password) {
    // gets the `User` instance with the given `username` from the `registeredUsers` object
    const user = this.registeredUsers[username];
    // checks if the user does not exist
    if (!user) {
      // throws an error if the user does not exist
      throw "Username or password is incorrect";
    } else if (user.password !== password) {
      // throws an error if the password is incorrect
      throw "Username or password is incorrect";
    } else {
      // logs in the user
      user.login();
      // logs a message indicating that the user has been logged in
      console.log(`${username} has been logged in.`);
    }
  }

  // a method that logs out an existing user
  logoutUser(username) {
    // gets the `User` instance with the given `username` from the `registeredUsers` object
    const user = this.registeredUsers[username];
    // checks if the user does not exist
    if (!user) {
      // throws an error if the user does not exist
      throw "No such user is logged in";
    } else {
      // logs out the user
      user.logout();
      // logs a message indicating that the user has been logged out
      console.log(`${username} has been logged out.`);
    }
  }

  // a method that creates a new `Scooter` instance and adds it to a station
  createScooter(station) {
    // checks if the station does not exist
    if (!this.stations[station]) {
      // throws an error if the station does not exist
      throw "No such station error";
    } else {
      // creates a new `Scooter` instance
      const scooter = new Scooter();
      // sets the station of the `Scooter` instance
      scooter.station = station;
      // adds the `Scooter` instance to the station's array of
      this.stations[station].push(scooter);
      console.log(`Created new scooter.`);
      return scooter;
    }
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw "No such station error";
    } else if (scooter.station === station) {
      throw "Scooter already at station error";
    } else {
      scooter.dock();
      this.stations[station].push(scooter);
      console.log(`Scooter is docked.`);
    }
  }

  rentScooter(scooter, user) {
    let scooterFound = false;
    let station = "";
    for (const key in this.stations) {
      const index = this.stations[key].indexOf(scooter);
      if (index !== -1) {
        scooterFound = true;
        station = key;
        break;
      }
    }
    if (!scooterFound) {
      throw "Scooter already rented";
    } else {
      this.stations[station].splice(index, 1);
      scooter.rent(user);
      console.log(`Scooter is rented.`);
    }
  }

  print() {
    console.log("Registered Users: ");
    for (let username in this.registeredUsers) {
      console.log(`Username: ${username}`);
    }
  
    console.log("\nStations and Number of Scooters: ");
    for (let station in this.stations) {
      console.log(`Station: ${station}, Number of Scooters: ${this.stations[station].length}`);
    }
  }
}

module.exports = ScooterApp
