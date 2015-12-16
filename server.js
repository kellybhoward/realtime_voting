var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//listen for requests on the http port 8000
var server = app.listen(8000, function(){
    console.log('cool stuff on: 8000');
});
//set up sockets
var io = require('socket.io').listen(server);
var map = {};
var numOfUsers = 0;
io.sockets.on('connection', function(socket){
    console.log("The connection id is: " + socket.id);
    numOfUsers += 1;
    console.log("The total number of users is " + numOfUsers);
    var user = map['user'+numOfUsers] = {};
    socket.on('voting', function(data){
        console.log('someone just voted!');
        io.emit('new_votes', {message: 'someone voted'});
    })
    socket.on('disconnect', function(){
        console.log(socket.id + " is now disconnnected");
        numOfUsers -= 1;
        console.log("The total number of users is " + numOfUsers);
    })
})
