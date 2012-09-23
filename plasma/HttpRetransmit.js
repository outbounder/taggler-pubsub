var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function HttpRetransmit(plasma){
  Organel.call(this, plasma);

  var socketio;

  this.on("WebSocketServer", function(chemical){
    socketio = chemical.data.server;
  });

  this.on("HttpRetransmit", function(chemical){
    chemical.type = chemical.chain.shift();

    console.log("GOT", chemical.req.body);

    if(!chemical.req || !chemical.req.body) {
      chemical.data = {result: "fail"};
      chemical.statusCode = 404;
      return this.emit(chemical);
    }

    var message = chemical.req.body;
    socketio.sockets.emit(message.event, message.data);
    chemical.data = {result: "success"};
    this.emit(chemical);
  });
}

util.inherits(module.exports, Organel);