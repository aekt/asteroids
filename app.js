import { Ship } from "./components/ship.js"

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

ship.when("a", ship.rotateLeft);
ship.when("d", ship.rotateRight);
ship.when("w", ship.accelerate);
ship.once(" ", ship.fire);

app.stage.addChild(ship);

function gameLoop(delta) {
    ship.update(delta);
}

app.ticker.add(gameLoop);
