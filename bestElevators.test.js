import bestElevators from "./bestElevators.js";

class ElevatorData {
  constructor(name, speed, timeStoppedPerFloor, startingFloor, targetFloor, allQueuedFloors, direction) {
    this.name = name;
    this.speed = speed; //in floors per unit time
    this.timeStoppedPerFloor = timeStoppedPerFloor;
    this.startingFloor = startingFloor;
    this.targetFloor = targetFloor;
    this.allQueuedFloors = allQueuedFloors;
    this.direction = direction;
  }
}

test('more stops ex.1', () => {
  const A = new ElevatorData("a", 1, 1, 2, 7, [1,2,3,4,5,6,7], "down")
  const B = new ElevatorData("b", 1, 1, 2, 7, [1,2,3,5,6,7], "down")
  expect(bestElevators([A,B])).toEqual(["b"]); //learnt not to use .toBe for arrays (serializes to the same string error)
});

test('queued floors order in array doesnt matter ex.1', () => {
  const A = new ElevatorData("a", 1, 1, 2, 7, [1,2,3,4,5,6,7], "down")
  const B = new ElevatorData("b", 1, 1, 2, 7, [1,2,3,5,6,7], "down")
  const C = new ElevatorData("a", 1, 1, 2, 7, [4,2,3,6,5,7,1], "down")
  const D = new ElevatorData("b", 1, 1, 2, 7, [7,2,5,3,6,1], "down")
  expect(bestElevators([A,B])).toEqual(bestElevators([C,D])); //learnt not to use .toBe for arrays (serializes to the same string error)
});

test('tie ex.1', () => {
  const A = new ElevatorData("a", 1, 1, 2, 7, [1,2,3,4,5,6,7], "down")
  const B = new ElevatorData("b", 1, 1, 2, 7, [1,2,3,4,5,6,7], "down")
  expect(bestElevators([A,B])).toEqual(["a","b"]);
});

test('tie ex.2', () => {
  const A = new ElevatorData("a", 1, 1, 7, 2, [2,3,4,5,6,7,8], "up")
  const B = new ElevatorData("b", 1, 1, 2, 7, [1,2,3,4,5,6,7], "down")
  expect(bestElevators([A,B])).toEqual(["a","b"]);
});

test('tie ex.3 simpler', () => {
  const A = new ElevatorData("a", 1, 1, 0, 10, [0,10], "up")
  const B = new ElevatorData("b", 1, 1, 2, 12, [2,12], "up")
  expect(bestElevators([A,B])).toEqual(["a","b"]);
});

test('tie ex.4 simpler', () => {
  const A = new ElevatorData("a", 1, 1, 10, 0, [0,10], "down")
  const B = new ElevatorData("b", 1, 1, 2, 12, [2,12], "up")
  expect(bestElevators([A,B])).toEqual(["a","b"]);
});

test('negative floors ex.1', () => {
  const A = new ElevatorData("a", 1, 1, 14, 0, [0,10], "down")
  const B = new ElevatorData("b", 1, 1, -2, 12, [2,12], "up")
  expect(bestElevators([A,B])).toEqual(["a","b"]);
});

test('negative floors ex.2', () => { //this test is just 'more stops ex.1' shifted down to negative numbers
  const A = new ElevatorData("a", 1, 1, -8, -3, [-9,-8,-7,-6,-5,-4,-3], "down")
  const B = new ElevatorData("b", 1, 1, -8, -3, [-9,-8,-7,-5,-4,-3], "down")
  expect(bestElevators([A,B])).toEqual(["b"]);
});