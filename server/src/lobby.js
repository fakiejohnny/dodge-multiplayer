class Player {
    constructor(user) {
        this.user = user;
    }
}

class Lobby {
    constructor(io) {
        this.io = io;
        this.players = [];
        this.size = {
            width: 1000,
            height: 800
        };
        this.join = this.join.bind(this);
        this.leave = this.leave.bind(this);
        this.emitInitData = this.emitInitData.bind(this);
        setInterval(() => {
            this.loop();
        }, 1000);
        setInterval(() => {
            this.slowLoop();
        }, 5000);
    }
    join(user) {
        const player = new Player(user);
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
        player.user.socket.emit('init', 'init Daten');
    }
    loop() {
        /* const data = this.players.map(player => ({
            position: player.position
        })) */

        this.io.emit('public_data', 'public data');
    }
    slowLoop() {
        this.players.forEach(player => {
            player.user.socket.emit('own_data', 'private data');
        });
    }
}

module.exports = Lobby;