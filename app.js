import { Ship } from "./components/ship.js"
import { Bullet } from "./components/bullet.js";

let app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    backgroundColor: 0x000000,
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

let width = app.view.width;
let height = app.view.height;
let radius = Math.max(width, height) * 2;
let centerX = width / 2;
let centerY = height / 2;

let ship = new Ship({ x: centerX, y: centerY, vx: 0, vy: 0 });
let bullets = [];

ship.when("a", ship.rotateLeft);
ship.when("d", ship.rotateRight);
ship.when("w", ship.accelerate);
ship.when("s", ship.decelerate);
ship.once(" ", ship.fire);
ship.on("fire", () => {
    let bullet = new Bullet({
        x: ship.x,
        y: ship.y,
        rotation: ship.rotation,
    });
    bullets.push(bullet);
    app.stage.addChild(bullet);
});

app.stage.addChild(ship);

function clean(delta, sprites) {
    function dist(ax, ay, bx, by) {
        return Math.sqrt(
            Math.pow(Math.abs(ax - bx), 2) +
            Math.pow(Math.abs(ay - by), 2))
    }
    for (let sprite of sprites) {
        if (dist(sprite.x, sprite.y, centerX, centerY) > radius) {
            sprite.alpha -= delta;
        }
    }
    sprites = sprites.filter(sprite => sprite.alpha > 0);
}

function gameLoop(delta) {
    ship.update(delta);
    for (let bullet of bullets) {
        bullet.update(delta);
    }
    clean(delta, bullets);
}

app.ticker.add(gameLoop);
