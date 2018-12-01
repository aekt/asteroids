export function Bullet(props) {
    let bullet = function () {
        let line = new PIXI.Graphics();
        line.lineStyle(4, 0x66FF33, 1);
        line.moveTo(0, 0);
        line.lineTo(0, 20);
        return line
    }();

    bullet.x = props.x;
    bullet.y = props.y;
    bullet.rotation = props.rotation;

    return bullet;
}