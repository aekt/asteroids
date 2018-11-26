import { keyboard, binder } from "./utils/keyboard.js"
import { Ship } from "./components/ship.js"

let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

PIXI.utils.sayHello(type)

let Application = PIXI.Application,
    Container = PIXI.Container,
    Graphics = PIXI.Graphics;

let app = new Application({
    width: 512,
    height: 512,
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

let ship = new Ship();
ship.x = 256;
ship.y = 256;
ship.vx = 0;
ship.vy = 0;

let leftButton = binder("a");
let rightButton = binder("d");
let upButton = binder("w");

app.stage.addChild(ship);

function gameLoop(delta) {
    if (leftButton.isPressed()) {
        ship.rotation -= delta / 10;
    }

    if (rightButton.isPressed()) {
        ship.rotation += delta / 10;
    }

    let acceleration = 0.1;

    if (upButton.isPressed()) {
        ship.vx -= acceleration * Math.sin(ship.rotation);
        ship.vy += acceleration * Math.cos(ship.rotation);
    }

    let decay = Math.pow(0.99, delta);
    ship.vx *= decay;
    ship.vy *= decay;

    ship.x += ship.vx * delta;
    ship.y += ship.vy * delta;
}

app.ticker.add(gameLoop)
