const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const uuid = require('uuid/v4');
const Lobby = require('./src/lobby');

http.listen(3000, function () {
    console.log('listening on *:3000');
});

class User {
    constructor(socket) {
        this.socket = socket;
        this.id = uuid();
    }
}

const lobby = new Lobby(io);

io.on('connection', function (socket) {
    socket.emit('test', 'connected to Server');

    socket.broadcast.emit('broadcast', ' a new user has logged in'); //(nicht an den Socket)

    const user = new User(socket);

    lobby.join(user);

    socket.on('disconnect', function () {
        lobby.leave(user);
    });
});