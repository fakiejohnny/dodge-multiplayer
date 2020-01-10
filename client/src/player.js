import Mouse from './mouse';
import Ball from './ball';
import io from 'socket.io-client';

export default class Player {
    constructor() {
        this.socket = io('http://localhost:3000');

        this.socket.on('test', data => {
            console.log(data);
        });

        this.socket.on('init', data => {
            console.log(data);
        });

        this.socket.on('own_data', data => {
            console.log(data);
        });

        this.socket.on('public_data', data => {
            console.log(data);
        });

        this.socket.on('broadcast', data => {
            console.log(data);
        });

        this.mouse = new Mouse();
        this.ball = new Ball(this.mouse);
    }
}
