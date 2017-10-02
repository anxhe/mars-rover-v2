
class Rover {

  constructor(name, symbol, position) {
    this.name = name;
    this.symbol = symbol;
    this.position = position;
    this.direction = "N";
    this.travelLog = [];
  }

  activate() {
    document.addEventListener("keyup", this.move.bind(this));
  }

  move(event) {
    console.log(event.keyCode);

    if (event.keyCode == keys.UP) {
        this.moveForward();
    }
    else if (event.keyCode == keys.RIGHT) {
        this.turnRight();
    }
    else if (event.keyCode == keys.LEFT) {
        this.turnLeft();
    }
    else if (event.keyCode == keys.DOWN) {
        this.moveBackward();
    }
    else {
      console.error("Hey, ese no es un movimiento");
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

  turnRight() {
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

  moveForward() {
    console.log("moveForward was called");
    if (grid.checkForwardBounderies(this))
      return console.error("Hey, con ese movimiento el rover se precipitará");

    var obstacule = grid.checkObstaculesForward(this);
    if (obstacule)
      return console.error("Hey, que te chocas con " + obstacule);

    grid.context[this.position[1]][this.position[0]] = 0;
    switch (this.direction) {
      case "N":
        this.position[1] -= 1;
        break;
      case "E":
        this.position[0] += 1;
        break;
      case "S":
        this.position[1] += 1;
        break;
      case "W":
        this.position[0] -= 1;
        break;
      }

    grid.context[this.position[1]][this.position[0]] = this.symbol;
    grid.draw();
    this.travelLog.push([this.position[1], this.position[0]]);
  }

  moveBackward() {
    console.log("moveBackward was called");
    if (grid.checkBackwardBounderies(this))
      return console.error("Hey, con ese movimiento el rover se precipitará");

    var obstacule = grid.checkObstaculesBackward(this)
    if (obstacule)
      return console.error("Hey, que te chocas con " + obstacule);

    grid.context[this.position[1]][this.position[0]] = 0
    switch (this.direction) {
      case "N":
        this.position[1] += 1;
        break;
      case "E":
        this.position[0] -= 1;
        break;
      case "S":
        this.position[1] -= 1;
        break;
      case "W":
        this.position[0] += 1;
        break;
      }
    grid.context[this.position[1]][this.position[0]] = this.symbol;
    grid.draw();
    this.travelLog.push([this.position[1], this.position[0]]);
  }
}
