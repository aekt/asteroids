export function Bullet(props) {
    let unit = function () {
        let line = new PIXI.Graphics();
        line.lineStyle(4, 0x66FF33, 1);
        line.moveTo(0, 0);
        line.lineTo(0, 20);
        return line
    }();

    unit.x = props.x;
    unit.y = props.y;
    unit.rotation = props.rotation;

    return unit;
}