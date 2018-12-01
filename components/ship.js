import { when, once, on, emit } from "../utils/manager.js"

export function Ship(props) {

    let ship = function () {
        let triangle = new PIXI.Graphics();
        triangle.beginFill(0x66FF33);
        triangle.drawPolygon([
            -8, -8,
            8, -8,
            0, 16,
        ]);
        triangle.endFill();
        return triangle;
    }();

    ship.x = props.x;
    ship.y = props.y;
    ship.vx = props.vx;
    ship.vy = props.vy;

    ship.rotateLeft = delta => {
        ship.rotation -= delta / 10;
    };

    ship.rotateRight = delta => {
        ship.rotation += delta / 10;
    };

    let acceleration = 0.1;
    ship.accelerate = delta => {
        ship.vx -= acceleration * delta * Math.sin(ship.rotation);
        ship.vy += acceleration * delta * Math.cos(ship.rotation);
    };

    ship.fire = () => {
        ship.emit("fire");
    }

    let events = {};
    ship.on = on(events);
    ship.emit = emit(events);

    let commands = [];
    ship.when = when(commands);
    ship.once = once(commands);

    let decay = delta => Math.pow(0.99, delta);
    ship.update = function (delta) {
        for (let command of commands) {
            command(delta);
        }

        ship.vx *= decay(delta);
        ship.vy *= decay(delta);
        ship.x += ship.vx * delta;
        ship.y += ship.vy * delta;
    };

    return ship;
}
