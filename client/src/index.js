import {
    canvas,
    ctx
} from './base';
import './reset';
import io from 'socket.io-client';
import Mouse from './mouse';

class Game {
    constructor() {
        this.playersData = null;
        this.playground = null;

        this.socket = io('http://localhost:3000');

        this.mouse = null;

        this.socket.on('test', data => {
            console.log(data);
        });

        this.socket.on('init', data => {
            this.resize(data);
            this.playground = data;
            this.loop();
        });

        this.socket.on('own_data', data => {
            console.log(data);
        });

        this.socket.on('public_data', data => {
            //console.log(data);
            this.playersData = data;
        });

        this.socket.on('broadcast', data => {
            console.log(data);
        });

        window.addEventListener("resize", () => {
            this.resize(this.playground);
        }, false);
    }
    resize(data) {
        const scale = window.devicePixelRatio;
        canvas.width = data.width * scale;
        canvas.height = data.height * scale;
        ctx.scale(scale, scale);
        const rect = canvas.getBoundingClientRect();
        if (this.mouse === null) {
            this.mouse = new Mouse(rect, scale);
        }
        this.mouse.rect = rect;
        this.mouse.scale = scale;
    }
    loop() {

        if (this.playground != null) {
            ctx.clearRect(0, 0, this.playground.width, this.playground.height);
        }

        if (this.playersData != null) {

            this.playersData.forEach(element => {
                this.draw(element)
            });
        }

        if (this.mouse != null) {

            const mouseData = {
                position: this.mouse.position,
                pressedDown: this.mouse.pressedDown
            }

            this.socket.emit('mouse_data', mouseData)
        }

        requestAnimationFrame(() => {
            this.loop();
        });
    }
    draw(element) {
        ctx.beginPath();
        ctx.arc(element.position.x, element.position.y, element.radius, 0, Math.PI * 2);
        ctx.fillStyle = element.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(element.position.x + 14.5 * Math.cos(element.angle), element.position.y + 14.5 * Math.sin(element.angle), 14, 0, Math.PI * 2);
        ctx.strokeStyle = "#666";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }
}

new Game();