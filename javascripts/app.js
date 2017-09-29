// Rover Object Goes Here
// ======================

class Rover {

  constructor(name, symbol, position) {
    this.name = name;
    this.symbol = symbol;
    this.position = position;
    this.direction = "N";
    this.travelLog = [];
  }

  move(string) {
    for(var i = 0; i < string.length; i++) {
      if (string[i] == "f") {
          moveForward(this);
      }
      else if (string[i] == "r") {
          this.turnRight();
      }
      else if (string[i] == "l") {
          this.turnLeft();
      }
      else if (string[i] == "b") {
          moveBackward(this);
      }
      else {
        console.error("Hey, ese no es un movimiento");
      }
    }
  }

  turnLeft() {
    console.log("turnLeft was called!");
    switch (this.direction) {
      case "N":
        this.direction = "W";
        break;
      case "W":
        this.direction = "S";
        break;
      case "S":
        this.direction = "E";
        break;
      case "E":
        this.direction = "N";
        break;
    }
  }

  turnRight(){
    console.log("turnRight was called!");
    switch (this.direction) {
      case "N":
        this.direction = "E";
        break;
      case "E":
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.direction = "N";
        break;
    }
  }
}

var pathfinder = new Rover("pathfinder", "🚘 ", [0,0]);
var curiosity = new Rover("Curiosity", "🚍", [0,9]);

// ======================
// Grid
// ======================

var grid = [
  [pathfinder.symbol, null, null, null, null, "🌳",null ,null ,null ,null],
  [null, null, null, null, null, "🌳" ,null ,null ,null ,null],
  ["⛰", null, null, null, null, null ,null ,null ,null ,null],
  [null, null, null, null, "🌳", null ,null ,null ,"⛰" ,null],
  [null, null, null, null, null, null ,"⛰" ,null ,null ,null],
  [null, null, null, null, null, null ,null ,null ,null ,null],
  [null, "🌳", "⛰", null, null, null ,null ,null ,"🌳",null],
  [null, null, "⛰", null, null, null ,null ,null ,null ,null],
  [null, null, null, null, null, null ,"🌳" ,null ,null ,null],
  [curiosity.symbol, null, null, null, null, null ,"⛰" ,null ,null ,null],
]

window.onload = function(){
  table(grid);
}

function table(grid){
  var html = '<table>';
  for (var row = 0; row < grid.length; row++){
    html += "<tr>"
    for (var col = 0; col < grid[row].length; col++){
        html += "<td>" + (grid[row][col] || "") + "</td>";
    }
    html += "</tr>"
  }
  html += "</table>"
  document.body.innerHTML = html;
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
      if (grid[rover.position[1] + 1][rover.position[0]] != null){
        return grid[rover.position[1] + 1][rover.position[0]];
      }
      break;
    case "E":
      if (grid[rover.position[1]][rover.position[0] - 1] != null){
        return grid[rover.position[1]][rover.position[0] - 1];
      }
      break;
    case "S":
      if (grid[rover.position[1] - 1][rover.position[0]] != null){
        return grid[rover.position[1] - 1][rover.position[0]];
      }
      break;
    case "W":
      if (grid[rover.position[1]][rover.position[0] + 1] != null){
        return grid[rover.position[1]][rover.position[0] + 1];
      }
      break;
    }
}

function checkObstaculesForward(rover){
  switch (rover.direction) {
    case "N":
      if (grid[rover.position[1] - 1][rover.position[0]] != null){
        return grid[rover.position[1] - 1][rover.position[0]];
      }
      break;
    case "E":
      if (grid[rover.position[1]][rover.position[0] + 1] != null){
        return grid[rover.position[1]][rover.position[0] + 1];
      }
      break;
    case "S":
      if (grid[rover.position[1] + 1][rover.position[0]] != null){
        return grid[rover.position[1] + 1][rover.position[0]];
      }
      break;
    case "W":
      if (grid[rover.position[1]][rover.position[0] - 1] != null){
        return grid[rover.position[1]][rover.position[0] - 1];
      }
      break;
    }
}
