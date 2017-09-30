// Rover Object Goes Here
// ======================

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
