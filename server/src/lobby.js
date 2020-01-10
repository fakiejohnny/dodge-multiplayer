const utils = require('./utils');
const Player = require('./player');

class Lobby {
    constructor(io) {
        this.io = io;
        this.players = [];
        this.obstacles = null;
        this.playground = {
            width: 800,
            height: 500
        }
        this.join = this.join.bind(this);
        this.leave = this.leave.bind(this);
        this.emitInitData = this.emitInitData.bind(this);
        setInterval(() => {
            this.gameLoop();
        }, 16.66666);
        setInterval(() => {
            this.emitLoop();
        }, 16.66666);
        setInterval(() => {
            this.slowLoop();
        }, 5000);
    }
    join(user) {
        const player = new Player(user, this.playground);
        this.players.push(player);
        this.emitInitData(player)
        console.log('user join');
        console.log(this.players.length);
    }
    leave(user) {
        this.players = this.players.filter(u => user.id !== u.user.id);
        console.log('user leave');
        console.log(this.players.length);
    }
    emitInitData(player) {
        player.user.socket.emit('init', this.playground);
    }
    gameLoop() {
        this.players.forEach(player => {
            player.ball.move();
        });
    }
    emitLoop() {
        const data = this.players.map(player => ({
            position: player.ball.position,
            radius: player.ball.radius,
            angle: player.ball.angle,
            color: player.ball.color
        }));

        this.io.emit('public_data', data);
    }
    slowLoop() {
        this.players.forEach(player => {
            player.user.socket.emit('own_data', 'private data');
        });
    }
}

module.exports = Lobby;