// Rover Object Goes Here
// ======================

var pathfinder = new Rover("pathfinder", "🚘 ", [0,0]);
var curiosity = new Rover("Curiosity", "🚍", [0,9]);

// ======================
// Grid
// ======================

var grid = new Grid();

window.onload = function(){
  grid.draw();
}
