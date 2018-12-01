import { keyboard } from "./keyboard.js"

export function when(commands) {
    return (key, callback) => {
        let pressed = false;
        keyboard(key).press = () => { pressed = true; };
        keyboard(key).release = () => { pressed = false; };
        commands.push(args => {
            if (pressed) {
                callback(args);
            }
        });
    }
}

export function once(commands) {
    return (key, callback) => {
        keyboard(key).press = callback;
    }
}

export function on(events) {
    return (event, callback) => {
        if (event in events) {
            events[event].push(callback);
        } else {
            events[event] = [callback];
        }
    }
}

export function emit(events) {
    return (event, ...args) => {
        if (event in events) {
            for (let callback of events[event]) {
                callback(args);
            }
        }
    }
}