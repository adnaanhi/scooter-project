const User = require('../src/User')

describe('User class', () => {
  let user;

  beforeEach(() => {
    user = new User('johndoe', 'password123', 30);
  });

  it('creates a user with the given username, password, and age', () => {
    expect(user.username).toBe('johndoe');
    expect(user.password).toBe('password123');
    expect(user.age).toBe(30);
  });

  it('starts with the loggedIn state set to false', () => {
    expect(user.loggedIn).toBe(false);
  });

  it('logs in the user when the correct password is provided', () => {
    user.login('password123');
    expect(user.loggedIn).toBe(true);
  });

  it('throws an error when an incorrect password is provided during login', () => {
    expect(() => { user.login('incorrectpassword') }).toThrowError("Incorrect password");
  });

  it('logs out the user', () => {
    user.login('password123');
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});

