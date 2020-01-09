import {Position, Size, calculateDistance, calculateAngel} from './utils';
import {canvas, ctx} from './base';
import playground from './playground';

export default class Ball {
    constructor(mouse) {
        this.mouse = mouse;
        this.color = '#24BCFF';
        this.position = new Position(50, 50);
        this.radius = 30;
        this.angle = -0.2*Math.PI;
        this.velocity = 6;
        this.currentSpeed = this.velocity;
    }
    move() {
        this.currentSpeed = this.velocity;
        let distance = calculateDistance(this.position, this.mouse.position);
        this.angle = calculateAngel(this.position, this.mouse.position);

        let brake = 100;
        let b = brake/this.velocity;
        if (distance <= brake) {
            this.currentSpeed = distance/b;
        }

        this.position.x += this.currentSpeed * Math.cos(this.angle);
		this.position.y += this.currentSpeed * Math.sin(this.angle);
		this.collisionEdge();
    }
    collisionEdge() {
		if (this.position.x + this.radius >= playground.size.width) {
			this.position.x = playground.size.width - this.radius;
		}
		if (this.position.x - this.radius <= 0) {
			this.position.x = 0 + this.radius;
		}
		if (this.position.y + this.radius >= playground.size.height) {
			this.position.y = playground.size.height - this.radius;
		}
		if (this.position.y - this.radius <= 0) {
			this.position.y = 0 + this.radius;
		}
	}

    draw() {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(this.position.x + 14.5 * Math.cos(this.angle), this.position.y + 14.5 * Math.sin(this.angle), 14, 0, Math.PI*2);
		ctx.strokeStyle = "#666";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
    }
}