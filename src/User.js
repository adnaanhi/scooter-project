class User {
  // Constructor for creating a new user with given username, password, and age
  constructor(username, password, age) {
    // Assign username, password, and age to the user object
    this.username = username;
    this.password = password;
    this.age = age;

    // Set the initial state of the user as logged out
    this.loggedIn = false;
  }

  // Method to log in the user with the given password
  login(password) {
    // Check if the given password is correct
    if (password === this.password) {
      // If the password is correct, set the loggedIn state to true
      this.loggedIn = true;
    } else {
      // If the password is incorrect, throw an error
      throw new Error("Incorrect password");
    }
  }

  // Method to log out the user
  logout() {
    // Set the loggedIn state to false
    this.loggedIn = false;
  }
}
module.exports = User
