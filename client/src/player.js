import Mouse from './mouse';
import Ball from './ball';
import io from 'socket.io-client';

export default class Player {
    constructor() {
        this.socket = io('http://localhost:3000');
        this.mouse = new Mouse();
        this.ball = new Ball(this.mouse);
    }
}
