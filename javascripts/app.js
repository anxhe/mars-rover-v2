// Rover Object Goes Here
// ======================

var rover = {
   direction: "N",
   position: [0,0],
   travelLog: []
 }

// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
}

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
}

function moveForward(rover){
  console.log("moveForward was called");
  switch (rover.direction) {
    case "N":
      rover.position[1] += 1;
      break;
    case "E":
      rover.position[0] += 1;
      break;
    case "S":
      rover.position[1] -= 1;
      break;
    case "W":
      rover.position[0] -= 1;
      break;
    }
  rover.travelLog.push(rover.position)
}


function move(string){
  for(var i = 0; i < string.length; i++) {
    if (string[i] == "f") {
        moveForward(rover);
    }
    else if (string[i] == "r") {
        turnRight(rover);
    }
    else if (string[i] == "l") {
        turnLeft(rover);
    }
    else {
      console.error("Hey, ese no es un movimiento")
    }
  }
}
