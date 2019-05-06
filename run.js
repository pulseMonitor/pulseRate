var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline
var express = require('express');
var socket = require('socket.io');



var app = express();
var server = app.listen(3005);

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    
    console.log(socket.id);
    
});

var serialPort = new SerialPort("COM11", {
  baudRate: 8080
})

var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
  //console.log('data received: ' + data)
  io.sockets.emit('map', data);
})

serialPort.on('open', function () {
  console.log('Communication is on!')
})
