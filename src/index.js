import '98.css/dist/98.css';
import { hexToRgb, rgbToHex } from './utils/colorConverter';
import { map } from './utils/map';
import { noise, noiseSeed } from './utils/noise';
import { save } from './utils/saveSvg';

noiseSeed(1); // comment out for random seed

// --- get input elems
let zoom = document.getElementById('zoom');
let resolution = document.getElementById('resolution');
let fill = document.getElementById('fill');
let fn = document.getElementById('fn');
let strokeColor = document.getElementById('strokeColor');
let strokeWidth = document.getElementById('strokeWidth');
let circle = document.querySelector('.circle');
let rect = document.querySelector('.rect');
let type = document.querySelector('.type');
let xOffset = document.getElementById('xOffset');
let yOffset = document.getElementById('yOffset');

// --- set defaults
fill.value = '#FF0000';
fn.value = 'x * y * c';
strokeColor.value = '#000000';
strokeWidth.value = 0.75;
resolution.value = 10;
zoom.value = 2;
xOffset.value = 1;
yOffset.value = 1;

// --- drawing loop
let svg = document.getElementById('svgWrapper');

function render() {
    svg.innerHTML = ''; // clear parent elem on every draw

    let WIDTH = 145 * zoom.value; // about 145x17 cm
    let HEIGHT = 17 * zoom.value;
    svg.style.width = WIDTH;
    svg.style.height = HEIGHT;
    // svg.style.border = `${strokeWidth.value}px solid ${strokeColor.value}`;
    // svg.style.background = strokeColor.value;
    svg.setAttribute('viewBox', `0 0 ${WIDTH + 2} ${HEIGHT + 2}`);

    for (let x = 1; x < WIDTH; x += WIDTH / resolution.value / xOffset.value) {
        for (let y = 1; y < HEIGHT; y += HEIGHT / resolution.value / yOffset.value) {
            if (rect.checked) {
                let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x);
                rect.setAttribute('y', y);
                rect.setAttribute('width', WIDTH / resolution.value / xOffset.value);
                rect.setAttribute('height', HEIGHT / resolution.value / yOffset.value);
                rect.setAttribute('stroke', strokeColor.value);
                rect.setAttribute('stroke-width', strokeWidth.value);
                rect.setAttribute('fill', calcFill(fill.value, x, y));
                svg.appendChild(rect);
            }

            if (circle.checked) {
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const radius = WIDTH / resolution.value / 2;
                circle.setAttribute('cx', x + radius / xOffset.value);
                circle.setAttribute('cy', y + radius / yOffset.value);
                circle.setAttribute('r', radius);
                circle.setAttribute('stroke', strokeColor.value);
                circle.setAttribute('stroke-width', strokeWidth.value);
                circle.setAttribute('fill', calcFill(fill.value, x, y));
                svg.appendChild(circle);
            }

            if (type.checked) {
                disableInput(strokeColor, true);
                disableInput(strokeWidth, true);

                strokeWidth.disabled = true;
                strokeColor.style.opacity = 0.4;
                strokeWidth.style.opacity = 0.4;

                let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('font-size', Math.pow(zoom.value, 2) + 'rem');
                text.setAttribute('x', x);
                text.setAttribute('y', y);
                text.innerHTML = 'a';
                text.setAttribute('fill', calcFill(fill.value, x, y));
                svg.appendChild(text);
            } else {
                disableInput(strokeColor, false);
                disableInput(strokeWidth, false);
            }
        }
    }
}

// do not remove x and y vars
function calcFill(c, x, y) {
    try {
        function calcNoise(c) {
            c = noise(eval(fn.value)); // how do you expose functions in eval?
            c = map(c, 0, 1, 0, 255);
            c = Math.round(c);
            return c;
        }
        c = hexToRgb(c);
        c.r = calcNoise(c.r);
        c.g = calcNoise(c.g);
        c.b = calcNoise(c.b);
        return rgbToHex(c.r, c.b, c.g);
    } catch {
        throw new Error('Could not calculate fill');
    }
}

// --- draw first frame
render();

// --- redraw on change
resolution.addEventListener('input', () => render());
fill.addEventListener('input', () => render());
fn.addEventListener('input', () => render());
strokeColor.addEventListener('input', () => render());
strokeWidth.addEventListener('input', () => render());
zoom.addEventListener('input', () => render());
circle.addEventListener('input', () => render());
rect.addEventListener('input', () => render());
type.addEventListener('input', () => render());
xOffset.addEventListener('input', () => render());
yOffset.addEventListener('input', () => render());

// --- helper
function disableInput(elem, disable) {
    if (elem instanceof HTMLDocument || typeof disable !== 'boolean') {
        throw new Error(
            'Function expects a DOM element and boolean condition: disableInput(elem, disable)'
        );
    }
    elem.disabled = disable;
    elem.style.opacity = disable ? 0.4 : 1;
}

// --- download button
const downloadButton = document.getElementById('download');
downloadButton.onclick = () => save(svg, 'gengrid-' + encodeURI(fn.value)); // encodes special chars
