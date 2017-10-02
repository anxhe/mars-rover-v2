
var grid = new Grid();
var oportunity = new Rover("Oportunity", "🚍", [0,0]);
var curiosity = new Rover("Curiosity", "🚘", [0,9]);

var keys = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
}


window.onload = function() {

  grid.addObject(oportunity);

  grid.addObject(curiosity);

  curiosity.activate();
  grid.draw();
}
