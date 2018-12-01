export function keyboard(value) {

    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

export function whenKey(key) {
    let keyObject = {};

    let pressed = false;
    keyboard(key).press = () => { pressed = true; };
    keyboard(key).release = () => { pressed = false; };

    keyObject.isPressed = callback => function (delta) {
        if (pressed) {
            callback(delta);
        }
    };

    return keyObject
}

export function keyTriggers(commands) {
    return function (key) {
        let keyObject = {};
        keyObject.isPressed = callback => {
            commands.push(whenKey(key).isPressed(callback));
        }
        return keyObject;
    }
}