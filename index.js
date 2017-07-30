const root = document.querySelector('#root');
let scale = 1.0;
let x = 0.0;
let y = 0.0;

let drag = false;
let lastX = 0.0;
let lastY = 0.0;

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return rgbToHex(r, g, b)
}

for (let i = 0; i < 1000; ++i) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.left = Math.random() * 3000 + 'px';
    el.style.top = Math.random() * 3000 + 'px';
    el.style.width = Math.random() * 300 + 'px';
    el.style.height = Math.random() * 300 + 'px';
    el.style.border = '1px solid black';
    el.style.opacity = '0.3';
    el.style.background = randomColor();
    root.appendChild(el)
}

function buildTransform() {
    return 'scale(' + scale + ') translate(' + x + 'px, ' + y + 'px)'
}

document.body.onmousewheel = function (event) {
    scale = scale * (1 + event.wheelDelta / 1000);
    root.style.transform = buildTransform()
};

document.body.onmousedown = function (event) {
    drag = true;
    lastX = event.screenX;
    lastY = event.screenY
};

document.body.onmouseup = function (event) {
    drag = false
};

document.body.onmousemove = function (event) {
    if (drag) {
        const dx = event.screenX - lastX;
        const dy = event.screenY - lastY;
        lastX = event.screenX;
        lastY = event.screenY;

        x += dx / scale;
        y += dy / scale;
        root.style.transform = buildTransform()
    }
};
