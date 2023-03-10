// My thought process:

// Assuming constant speed... speed = distance/time => time = distance/speed => time ∝ distance
// So to get to the target floor the fastest, the elevator will travel the least distance.
// Let's say the vertical distance between two consequetive floors is 1 unit.
// We could include the (deceleration/acceleration)AtArrivalOrDepartureToFloor and timeStoppedAtFloor as timeStoppedPerFloor
// Don't know how elevators accelerate though, is there a max speed for transport or will it keep accelerating e.g. if going from floor 1 to like 100
// I have assumed that elevators will have 2 distict trips, 1 up and 1 down. (or just 1 of them)

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

//e.g. A = new ElevatorData("a", 1, 1, 0, 4, [0,4,1,2,5,7], "up")

const startToTargetFloorTime = (elevatorDataInstance) => {
  if (elevatorDataInstance.direction === "up") {
    let queuedFloors = elevatorDataInstance.allQueuedFloors
    const maxFloor = Math.max(...queuedFloors)
    const startingFloor = elevatorDataInstance.startingFloor
    const targetFloor = elevatorDataInstance.targetFloor
    let increasinglySortedQueuedFloors = queuedFloors.sort(function(a, b) {return a - b})
    
    let indexToSplit = increasinglySortedQueuedFloors.indexOf(startingFloor)
    let upwardsTrip = increasinglySortedQueuedFloors.slice(indexToSplit)
    let downwardsTrip = increasinglySortedQueuedFloors.slice(0, indexToSplit).sort(function(a, b) {return b - a})
    let overallTrip = upwardsTrip.concat(downwardsTrip)

    const distanceInFloors = () => {
      if (upwardsTrip.includes(targetFloor)) {
        return (targetFloor - startingFloor)
      } else {
        return ((maxFloor - startingFloor) + (maxFloor - targetFloor))
      }
    }
    const targetFloorIndex = overallTrip.indexOf(targetFloor)
    const overallTripToTarget = overallTrip.slice(0, targetFloorIndex+1)
    const numberOfStopsToTarget = overallTripToTarget.length - 1
    return ((distanceInFloors()/elevatorDataInstance.speed) + (numberOfStopsToTarget*elevatorDataInstance.timeStoppedPerFloor))

  } if (elevatorDataInstance.direction === "down") {
    let queuedFloors = elevatorDataInstance.allQueuedFloors
    const minFloor = Math.min(...queuedFloors)
    const startingFloor = elevatorDataInstance.startingFloor
    const targetFloor = elevatorDataInstance.targetFloor
    let decreasinglySortedQueuedFloors = queuedFloors.sort(function(a, b) {return b - a})

    let indexToSplit = decreasinglySortedQueuedFloors.indexOf(startingFloor)
    let downwardsTrip = decreasinglySortedQueuedFloors.slice(indexToSplit)
    let upwardsTrip = decreasinglySortedQueuedFloors.slice(0, indexToSplit).sort(function(a, b) {return a - b})
    let overallTrip = downwardsTrip.concat(upwardsTrip)
    const distanceInFloors = () => {
      if (downwardsTrip.includes(targetFloor)) {
        return (startingFloor - targetFloor)
      } else {
        return ((startingFloor - minFloor) + (targetFloor - minFloor))
      }
    } 
    
    const targetFloorIndex = overallTrip.indexOf(targetFloor)
    const overallTripToTarget = overallTrip.slice(0, targetFloorIndex+1)
    const numberOfStopsToTarget = overallTripToTarget.length - 1
    return ((distanceInFloors()/elevatorDataInstance.speed) + (numberOfStopsToTarget*elevatorDataInstance.timeStoppedPerFloor))
    
  } else {
    throw(`Invalid direction given, "${elevatorDataInstance.direction}", must be "up" or "down".`)
  }
} 

function getAllIndexes(arr, val) {
    let indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const bestElevators = (arrayOfElevatorDataInstances) => {
  const times = []
  arrayOfElevatorDataInstances.map(
    (elevatorDataInstance) => {
      times.push(startToTargetFloorTime(elevatorDataInstance))
    }
  )
  const shortestTime = Math.min(...times)
  const bestIndices = getAllIndexes(times, shortestTime)
  const bestElevators = []
  bestIndices.map((x,i) => {bestElevators.push(arrayOfElevatorDataInstances[x].name)})
  return bestElevators
}

export default bestElevators