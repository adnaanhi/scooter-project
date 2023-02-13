const Scooter = require('../src/Scooter');
const User = require('../src/User');
const ScooterApp = require('../src/ScooterApp');

describe('ScooterApp', () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
  });

  describe('registerUser', () => {
    test('registers user successfully', () => {
      const username = 'Adnaan';
      const password = 'PasswordMultiverse';
      const age = 24;

      scooterApp.registerUser(username, password, age);

      expect(scooterApp.registeredUsers[username]).toBeInstanceOf(User);
    });

    test('throws error if user is already registered', () => {
      const username = 'Adnaan';
      const password = 'PasswordMultiverse';
      const age = 24;

      scooterApp.registerUser(username, password, age);

      expect(() => {
        scooterApp.registerUser(username, password, age);
      }).toThrowError('User already registered');
    });

    test('throws error if age is less than 18', () => {
      const username = 'Adnaan';
      const password = 'PasswordMultiverse';
      const age = 15;

      expect(() => {
        scooterApp.registerUser(username, password, age);
      }).toThrowError('User is too young to register');
    });
  });

  describe('loginUser', () => {
    test('logs user in successfully', () => {
      const username = 'Adnaan';
      const password = 'PasswordMultiverse';
      const age = 24;

      scooterApp.registerUser(username, password, age);
      scooterApp.loginUser(username, password);

      const user = scooterApp.registeredUsers[username];
      expect(user.isLoggedIn).toBe(true);
    });

    test('throws error if username or password is incorrect', () => {
      const username = 'Adnaan';
      const password = 'PasswordMultiverse';
      const age = 24;

      scooterApp.registerUser(username, password, age);

      expect(() => {
        scooterApp.loginUser(username, 'incorrect password');
      }).toThrowError('Incorrect username or password');
    });
  });

  describe('logoutUser', () => {
    test('logs user out successfully', () => {
      const username = 'Adnaan';
      const password = 'PasswordMultiverse';
      const age = 24;

      scooterApp.registerUser(username, password, age);
      scooterApp.loginUser(username, password);
      scooterApp.logoutUser(username);

      const user = scooterApp.registeredUsers[username];
      expect(user.isLoggedIn).toBe(false);
    });

    test('throws error if no such user is logged in', () => {
      const username = 'Adnaan';

      expect(() => {
        scooterApp.logoutUser(username);
      }).toThrowError('No such user is logged in');
    });
  });
});