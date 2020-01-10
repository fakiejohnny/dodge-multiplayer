const utils = require('./utils');

const colorPalette = [
    '#24BCFF',
    '#4FDE36',
    '#FFE200'
]

class Mouse {
    constructor() {
        this.position = new utils.Position(600, 400);
    }
}

class Ball {
    constructor(mouse, playground) {
        this.mouse = mouse;
        this.playground = playground;
        this.color = colorPalette[utils.getRandomInt(0, colorPalette.length - 1)];
        this.position = new utils.Position(50, 50);
        this.radius = 30;
        this.angle = -0.2 * Math.PI;
        this.velocity = 6;
        this.currentSpeed = this.velocity;
    }
    move() {
        this.currentSpeed = this.velocity;
        let distance = utils.calculateDistance(this.position, this.mouse.position);
        this.angle = utils.calculateAngel(this.position, this.mouse.position);

        let brake = 100;
        let b = brake / this.velocity;
        if (distance <= brake) {
            this.currentSpeed = distance / b;
        }

        this.position.x += this.currentSpeed * Math.cos(this.angle);
        this.position.y += this.currentSpeed * Math.sin(this.angle);
        this.collisionEdge();
    }
    collisionEdge() {
        if (this.position.x + this.radius >= this.playground.width) {
            this.position.x = this.playground.width - this.radius;
        }
        if (this.position.x - this.radius <= 0) {
            this.position.x = 0 + this.radius;
        }
        if (this.position.y + this.radius >= this.playground.height) {
            this.position.y = this.playground.height - this.radius;
        }
        if (this.position.y - this.radius <= 0) {
            this.position.y = 0 + this.radius;
        }
    }

}

class Player {
    constructor(user, playground) {
        this.user = user;
        this.mouse = new Mouse();
        this.ball = new Ball(this.mouse, playground);
        this.user.socket.on('mouse_data', data => {
            this.mouse.position = data.position;
        });
    }
}

module.exports = Player;