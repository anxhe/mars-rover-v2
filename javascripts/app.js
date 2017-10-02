
window.onload = function() {
  var grid = new Grid();

  var oportunity = new Rover("Oportunity", "🚘 ", [0,0]);
  var curiosity = new Rover("Curiosity", "🚍", [0,9]);

  grid.addObject(oportunity);
  grid.addObject(curiosity);

  grid.draw();
}
