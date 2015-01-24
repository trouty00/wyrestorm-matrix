var wyrestorm = require('../../lib/app')
  , config = require('./config')
  , transportConfig = require('./config-transport');

var matrix = new wyrestorm(
  config,
  new wyrestorm.transports.telnet(transportConfig)
);

matrix.connect();
matrix.on('connect', function() {
  console.log('Connected');

  matrix.setOutputAndEdid(1, 1, function(err) {
    if (err) {
      console.log(err.toString());
      return;
    }

    console.log("Matrix set output 1 to input 1 with EDID copy");
  });
});

matrix.on('disconnect', function() {
  console.log('Disconnected');
});

setTimeout(function() {
  matrix.disconnect();
  process.exit(0);
}, 8000);

process.on('SIGINT', function() {
  console.log("Caught interrupt signal");

  matrix.disconnect();
  process.exit(0);
});