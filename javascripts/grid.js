
class Grid {

  constructor() {
    this.context = [
      [null, null, null, null, null, "🌳",null ,null ,null ,null],
      [null, null, null, null, null, "🌳" ,null ,null ,null ,null],
      ["⛰", null, null, null, null, null ,null ,null ,null ,null],
      [null, null, null, null, "🌳", null ,null ,null ,"⛰" ,null],
      [null, null, null, null, null, null ,"⛰" ,null ,null ,null],
      [null, null, null, null, null, null ,null ,null ,null ,null],
      [null, "🌳", "⛰", null, null, null ,null ,null ,"🌳",null],
      [null, null, "⛰", null, null, null ,null ,null ,null ,null],
      [null, null, null, null, null, null ,"🌳" ,null ,null ,null],
      [null, null, null, null, null, null ,"⛰" ,null ,null ,null],
    ]
  }

  addObject(object) {
    this.context[object.position[1]][object.position[0]] = object.symbol;
  }

  draw() {
    var html = '<table>';
    for (var row of this.context) {
      html += "<tr>"
      for (var obj of row){
        html += "<td>" + (obj || "") + "</td>";
      }
      html += "</tr>"
    }
    html += "</table>"
    document.body.innerHTML = html;
  }

  checkBackwardBounderies(rover){
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

  checkForwardBounderies(rover){
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

  checkObstaculesBackward(rover){
    switch (rover.direction) {
      case "N":
        if (this.context[rover.position[1] + 1][rover.position[0]] != null){
          return this.context[rover.position[1] + 1][rover.position[0]];
        }
        break;
      case "E":
        if (this.context[rover.position[1]][rover.position[0] - 1] != null){
          return this.context[rover.position[1]][rover.position[0] - 1];
        }
        break;
      case "S":
        if (this.context[rover.position[1] - 1][rover.position[0]] != null){
          return this.context[rover.position[1] - 1][rover.position[0]];
        }
        break;
      case "W":
        if (this.context[rover.position[1]][rover.position[0] + 1] != null){
          return this.context[rover.position[1]][rover.position[0]];
        }
        break;
      }
  }

  checkObstaculesForward(rover){
    switch (rover.direction) {
      case "N":
        if (this.context[rover.position[1] - 1][rover.position[0]] != null){
          return this.context[rover.position[1] - 1][rover.position[0]];
        }
        break;
      case "E":
        if (this.context[rover.position[1]][rover.position[0] + 1] != null){
          return this.context[rover.position[1]][rover.position[0] + 1];
        }
        break;
      case "S":
        if (this.context[rover.position[1] + 1][rover.position[0]] != null){
          return this.context[rover.position[1] + 1][rover.position[0]];
        }
        break;
      case "W":
        if (this.context[rover.position[1]][rover.position[0] - 1] != null){
          return this.context[rover.position[1]][rover.position[0] - 1];
        }
        break;
      }
  }
}
