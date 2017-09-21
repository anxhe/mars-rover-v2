// Rover Object Goes Here
// ======================

var moveFunc = function(string){
  for(var i = 0; i < string.length; i++) {
    if (string[i] == "f") {
        moveForward(this);
    }
    else if (string[i] == "r") {
        turnRight(this);
    }
    else if (string[i] == "l") {
        turnLeft(this);
    }
    else if (string[i] == "b") {
        moveBackward(this);
    }
    else {
      console.error("Hey, ese no es un movimiento");
    }
  }
}

var rover_x = {
  name: "Pathfinder",
  symbol: "X",
  move: moveFunc,
  direction: "N",
  position: [0,0],
  travelLog: []
}

var rover_t = {
  name: "Curiosity",
  symbol: "T",
  move: moveFunc,
  direction: "N",
  position: [0,9],
  travelLog: []
}

// ======================
// Grid
// ======================

var grid = [
  ["X", 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  [0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  ["rocas", 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  [0, 0, 0, 0, "rocas", 0 ,0 ,0 ,0 ,0],
  [0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  [0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  [0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  [0, 0, "rocas", 0, 0, 0 ,0 ,0 ,0 ,0],
  [0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0],
  ["T", 0, 0, 0, 0, 0 ,"rocas" ,0 ,0 ,0],
]

console.table(grid);

window.onload = function(){
  table(grid);
}

function table(grid){
  var html = "<table>"
  for (var row = 0; row < grid.length; row++){
    html += "<tr>"
    for (var col = 0; col < grid[row].length; col++){
        html += "<td>" + grid[row][col] + "</td>";
    }
    html += "</tr>"
  }
  html += "</table>"
  document.body.innerHTML = html;
}

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

function checkForwardBounderies(rover){
  if (rover.direction == "N" && rover.position[1] == 0){
    return true;
  }
  else if (rover.direction == "S" && rover.position[1] == 9){
    return true;
  }
  else if (rover.direction == "E" && rover.position[0] == 9){
    return true;
  }
  else if (rover.direction == "W" && rover.position[0] == 0){
    return true;
  }
}

function moveForward(rover){
  console.log("moveForward was called");
  if (checkForwardBounderies(rover))
    return console.error("Hey, con ese movimiento el rover se precipitará");

  var obstacule = checkObstaculesForward(rover);
  if (obstacule)
    return console.error("Hey, que te chocas con " + obstacule);

  grid[rover.position[1]][rover.position[0]] = 0;
  switch (rover.direction) {
    case "N":
      rover.position[1] -= 1;
      break;
    case "E":
      rover.position[0] += 1;
      break;
    case "S":
      rover.position[1] += 1;
      break;
    case "W":
      rover.position[0] -= 1;
      break;
    }

  grid[rover.position[1]][rover.position[0]] = rover.symbol;
  table(grid);
  rover.travelLog.push([rover.position[1], rover.position[0]]);
}

function checkBackwardBounderies(rover){
  if (rover.direction == "N" && rover.position[1] == 9){
    return true;
  }
  else if (rover.direction == "E" && rover.position[0] == 0){
    return true;
  }
  else if (rover.direction == "S" && rover.position[1] == 0){
    return true;
  }
  else if (rover.direction == "W" && rover.position[0] == 9){
    return true;
  }
}

function moveBackward(rover){
  console.log("moveBackward was called");
  if (checkBackwardBounderies(rover))
    return console.error("Hey, con ese movimiento el rover se precipitará");

  var obstacule = checkObstaculesBackward(rover)
  if (obstacule)
    return console.error("Hey, que te chocas con " + obstacule);

  grid[rover.position[1]][rover.position[0]] = 0
  switch (rover.direction) {
    case "N":
      rover.position[1] += 1;
      break;
    case "E":
      rover.position[0] -= 1;
      break;
    case "S":
      rover.position[1] -= 1;
      break;
    case "W":
      rover.position[0] += 1;
      break;
    }
  grid[rover.position[1]][rover.position[0]] = rover.symbol;
  table(grid);
  rover.travelLog.push([rover.position[1], rover.position[0]]);
}

function checkObstaculesBackward(rover){
  switch (rover.direction) {
    case "N":
      if (grid[rover.position[1] + 1][rover.position[0]] != 0){
        return grid[rover.position[1] + 1][rover.position[0]];
      }
      break;
    case "E":
      if (grid[rover.position[1]][rover.position[0] - 1] != 0){
        return grid[rover.position[1]][rover.position[0] - 1];
      }
      break;
    case "S":
      if (grid[rover.position[1] - 1][rover.position[0]] != 0){
        return grid[rover.position[1] - 1][rover.position[0]];
      }
      break;
    case "W":
      if (grid[rover.position[1]][rover.position[0] + 1] != 0){
        return grid[rover.position[1]][rover.position[0] + 1];
      }
      break;
    }
}

function checkObstaculesForward(rover){
  switch (rover.direction) {
    case "N":
      if (grid[rover.position[1] - 1][rover.position[0]] != 0){
        return grid[rover.position[1] - 1][rover.position[0]];
      }
      break;
    case "E":
      if (grid[rover.position[1]][rover.position[0] + 1] != 0){
        return grid[rover.position[1]][rover.position[0] + 1];
      }
      break;
    case "S":
      if (grid[rover.position[1] + 1][rover.position[0]] != 0){
        return grid[rover.position[1] + 1][rover.position[0]];
      }
      break;
    case "W":
      if (grid[rover.position[1]][rover.position[0] - 1] != 0){
        return grid[rover.position[1]][rover.position[0] - 1];
      }
      break;
    }
}
