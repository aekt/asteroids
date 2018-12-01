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

let ship = new Ship({ x: 256, y: 256, vx: 0, vy: 0 });
let bullets = [];

ship.when("a", ship.rotateLeft);
ship.when("d", ship.rotateRight);
ship.when("w", ship.accelerate);
ship.when("s", ship.decelerate);
ship.once(" ", ship.fire);
ship.on("fire", () => {
    let bullet = new Bullet({ x: ship.x, y: ship.y, rotation: ship.rotation });
    bullets.push(bullet);
    app.stage.addChild(bullet);
});

app.stage.addChild(ship);

function gameLoop(delta) {
    ship.update(delta);
    for (let bullet of bullets) {
        bullet.update(delta);
    }
}

app.ticker.add(gameLoop);
