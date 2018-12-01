import { when, once, on, emit } from "../utils/manager.js"

export function Ship(props) {

    let unit = function () {
        let triangle = new PIXI.Graphics();
        triangle.beginFill(0x66FF33);
        triangle.drawPolygon([
            -8, -8,
            16, 0,
            -8, 8,
        ]);
        triangle.endFill();
        return triangle;
    }();

    unit.x = props.x;
    unit.y = props.y;
    unit.vx = props.vx;
    unit.vy = props.vy;

    unit.rotateLeft = delta => {
        unit.rotation -= delta / 10;
    };

    unit.rotateRight = delta => {
        unit.rotation += delta / 10;
    };

    let acceleration = 0.1;
    unit.accelerate = delta => {
        unit.vx += acceleration * delta * Math.cos(unit.rotation);
        unit.vy += acceleration * delta * Math.sin(unit.rotation);
    };

    unit.decelerate = delta => {
        unit.vx -= acceleration * delta * Math.cos(unit.rotation);
        unit.vy -= acceleration * delta * Math.sin(unit.rotation);
    };

    unit.fire = () => {
        unit.emit("fire");
    }

    let events = {};
    unit.on = on(events);
    unit.emit = emit(events);

    let commands = [];
    unit.when = when(commands);
    unit.once = once(commands);

    let decay = delta => Math.pow(0.99, delta);
    unit.update = function (delta) {
        for (let command of commands) {
            command(delta);
        }

        unit.vx *= decay(delta);
        unit.vy *= decay(delta);
        unit.x += unit.vx * delta;
        unit.y += unit.vy * delta;
    };

    return unit;
}
