import {
    Position
} from './utils';

export default class Mouse {
    constructor(rect, scale) {
        this.position = new Position(0, 0);
        this.pressedDown = false;
        this.rect = rect;
        this.scale = scale;
        document.addEventListener("mousemove", (e) => {
            this.setPosition(e);
        }, false);
        document.addEventListener("mousedown", (e) => {
            this.down(e);
        }, false);
        document.addEventListener("mouseup", (e) => {
            this.up(e);
        }, false);
    }
    setPosition(e) {
        this.position.x = (e.clientX - this.rect.left) / this.scale;
        this.position.y = (e.clientY - this.rect.top) / this.scale;
    }
    down(e) {
        this.PressedDown = true;
    }
    up(e) {
        this.PressedDown = false;
    }
}