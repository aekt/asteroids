export function Bullet(props) {
    let unit = function () {
        let line = new PIXI.Graphics();
        line.lineStyle(4, 0x66FF33, 1);
        line.moveTo(0, 0);
        line.lineTo(10, 0);
        return line
    }();

    unit.x = props.x;
    unit.y = props.y;
    unit.rotation = props.rotation;

    let velocity = 10;
    unit.vx = velocity * Math.cos(props.rotation);
    unit.vy = velocity * Math.sin(props.rotation);

    let decay = delta => Math.pow(1.00, delta);
    unit.update = delta => {
        unit.vx *= decay(delta);
        unit.vy *= decay(delta);
        unit.x += unit.vx * delta;
        unit.y += unit.vy * delta;
    };

    return unit;
}