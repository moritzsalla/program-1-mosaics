import '98.css/dist/98.css';
import { calcFill } from './math/calcFill';
import { rgbToHex } from './utils/colorConverter';
import { disableInput } from './utils/disableInput';
import { dragElement } from './utils/draggeable';
import { ErrorUI } from './utils/errorUI';
import { save } from './utils/saveSvg';

// --- inputs ---
let zoom = document.getElementById('zoom') as HTMLInputElement;
let height = document.getElementById('height') as HTMLInputElement;
let width = document.getElementById('width') as HTMLInputElement;
let resolution = document.getElementById('resolution') as HTMLInputElement;
let fill = document.getElementById('fill') as HTMLInputElement;
let fn = document.getElementById('fn') as HTMLInputElement;
let strokeColor = document.getElementById('strokeColor') as HTMLInputElement;
let strokeWidth = document.getElementById('strokeWidth') as HTMLInputElement;
let circle = document.querySelector('.circle') as HTMLInputElement;
let rect = document.querySelector('.rect') as HTMLInputElement;
let xOffset = document.getElementById('xOffset') as HTMLInputElement;
let yOffset = document.getElementById('yOffset') as HTMLInputElement;

// --- default values ---
fill.value = '#FF0000';
height.value = String(Math.round(window.innerHeight * 0.1));
width.value = String(Math.round(window.innerWidth * 0.1));
fn.value = 'Math.sin(c*x*y) + 10';
strokeColor.value = '#000000';
strokeWidth.value = '0.25';
resolution.value = '10';
zoom.value = '8';
xOffset.value = '15';
yOffset.value = '1';

const errorUI = new ErrorUI(document.getElementById('fn'), 'span', 'err');

/**
 * Runs the drawing loop
 */

function render() {
    let svg = document.getElementById('svgWrapper');
    svg.innerHTML = ''; // important: clear parent elem on every draw
    errorUI.remove();

    let WIDTH = Number(width.value) * Number(zoom.value);
    let HEIGHT = Number(height.value) * Number(zoom.value);
    svg.style.width = String(WIDTH);
    svg.style.height = String(HEIGHT);

    svg.setAttribute('viewBox', `0 0 ${WIDTH + 2} ${HEIGHT + 2}`);

    for (let x = 1; x < WIDTH; x += WIDTH / Number(resolution.value) / Number(xOffset.value)) {
        for (let y = 1; y < HEIGHT; y += HEIGHT / Number(resolution.value) / Number(yOffset.value)) {
            if (rect.checked) {
                let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', String(x));
                rect.setAttribute('y', String(y));
                rect.setAttribute('width', String(WIDTH / Number(resolution.value) / Number(xOffset.value)));
                rect.setAttribute('height', String(HEIGHT / Number(resolution.value) / Number(yOffset.value)));
                rect.setAttribute('stroke', strokeColor.value);
                rect.setAttribute('stroke-width', strokeWidth.value);
                try {
                    rect.setAttribute('fill', calcFill(fill.value, x, y));
                } catch {
                    errorUI.create('There is a mistake in your function. Try something else.');
                }
                svg.appendChild(rect);
            }

            if (circle.checked) {
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const radius = WIDTH / Number(resolution.value) / 2;
                circle.setAttribute('cx', String(x + radius / Number(xOffset.value) + radius / 2));
                circle.setAttribute('cy', String(y + radius / Number(yOffset.value) - radius / 2));
                circle.setAttribute('r', String(radius));
                circle.setAttribute('stroke', strokeColor.value);
                circle.setAttribute('stroke-width', strokeWidth.value);
                try {
                    circle.setAttribute('fill', calcFill(fill.value, x, y));
                } catch {
                    errorUI.create('There is a mistake in your function. Try something else.');
                }
                svg.appendChild(circle);
            }
        }
    }
}

// --- draw first frame ---
render();

// --- redraw grid on input change ---
resolution.addEventListener('input', () => render());
height.addEventListener('change', () => render());
width.addEventListener('change', () => render());
fill.addEventListener('input', () => render());
fn.addEventListener('input', () => render());
strokeColor.addEventListener('input', () => render());
strokeWidth.addEventListener('input', () => render());
zoom.addEventListener('input', () => render());
circle.addEventListener('input', () => render());
rect.addEventListener('input', () => render());
xOffset.addEventListener('input', () => render());
yOffset.addEventListener('input', () => render());

// --- set background color ---
let bg = document.getElementById('bg') as HTMLInputElement;
bg.value = rgbToHex(30, 30, 30);
bg.addEventListener('input', () => setBGColor());
setBGColor();

function setBGColor() {
    document.body.style.backgroundColor = bg.value;
}

// --- make UI draggeable ---
dragElement(document.querySelector('.title-bar'), document.querySelector('.window'));

// --- download button ---#
let svg = document.getElementById('svgWrapper');
const downloadButton = document.getElementById('download');
downloadButton.onclick = () => save(svg, 'gengrid');
