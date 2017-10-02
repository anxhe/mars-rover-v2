
var grid = new Grid();
var oportunity = new Rover("Oportunity", "🚍", [0,0]);
var curiosity = new Rover("Curiosity", "🚘", [0,9]);

var keys = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
}

var message = {
  INVALID: "<br><span id='sms'>Hey, ese no es un movimiento válido<span>",
  BOUNDARIES: "<br><span id='sms'> Hey, que te caes..!! Tal parece Marte es un planeta plano 🤔 </span>",
  OBSTACULE: function(obs) {
    return "<br><span id='sms'> Hey, que te chocas con " + obs + "</span>";
  }
}

window.onload = function() {

  grid.addObject(oportunity);

  grid.addObject(curiosity);

  curiosity.activate();
  grid.draw();
}
