let Graphics = PIXI.Graphics;

export function Ship() {

    let triangle = new Graphics();
    triangle.beginFill(0x66FF33);
    triangle.drawPolygon([
        -8, -8,
        8, -8,
        0, 16,
    ]);
    triangle.endFill();

    return triangle
}
