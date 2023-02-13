const Scooter = require('../src/Scooter')
const User = require('../src/User')

describe('Scooter', () => {
  let scooter;
  let station = { name: 'Station 1' };

  beforeEach(() => {
    scooter = new Scooter(station); // create a new Scooter instance before each test
  });

  test('constructor initializes a Scooter instance with a station and default values for other properties', () => {
    expect(scooter.station).toBe(station);
    expect(scooter.user).toBeNull();
    expect(scooter.serial).toBe(0);
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
  });

  test('rent method assigns a user to the scooter and sets its station to null', () => {
    scooter.rent();
    expect(scooter.user).toEqual(new User());
    expect(scooter.station).toBeNull();
  });

  test('rent method throws an error if the scooter needs to charge', () => {
    scooter.charge = 19;
    expect(() => scooter.rent()).toThrowError('Scooter needs to charge');
  });

  test('rent method throws an error if the scooter needs repair', () => {
    scooter.isBroken = true;
    expect(() => scooter.rent()).toThrowError('Scooter needs repair');
  });

  test('dock method sets the scooter\'s station to the specified station and user to null', () => {
    let newStation = { name: 'Station 2' };
    scooter.dock(newStation);
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe(newStation);
  });

  test('recharge method increases the scooter\'s charge by 1% every second until it reaches 100%', (done) => {
    scooter.charge = 50;
    jest.spyOn(console, 'log'); // spy on the console.log method
    scooter.recharge();
    setTimeout(() => {
      expect(scooter.charge).toBe(100);
      expect(console.log).toHaveBeenCalledWith('Scooter charge: 51%');
      done();
    }, 2000);
  });

  test('requestRepair method sets the scooter\'s broken status to true and logs "Repair completed" after 5 seconds', (done) => {
    scooter.requestRepair();
    setTimeout(() => {
      expect(scooter.isBroken).toBe(false);
      expect(console.log).toHaveBeenCalledWith('Repair completed');
      done();
    }, 5000);
  });
});
