import '98.css/dist/98.css';
import { calcFill } from './math/calcFill';
import { detail, seed } from './math/simplexNoise';
import { rgbToHex } from './utils/colorConverter';
import { dragElement } from './utils/draggeable';
import { ErrorUI } from './utils/errorUI';
import { save } from './utils/saveSvg';

// --- inputs ---
let zoom = document.getElementById('zoom') as HTMLInputElement;
let height = document.getElementById('height') as HTMLInputElement;
let width = document.getElementById('width') as HTMLInputElement;
let fill = document.getElementById('fill') as HTMLInputElement;
let fn = document.getElementById('fn') as HTMLInputElement;
let strokeColor = document.getElementById('strokeColor') as HTMLInputElement;
let strokeWidth = document.getElementById('strokeWidth') as HTMLInputElement;
let xOffset = document.getElementById('xOffset') as HTMLInputElement;
let yOffset = document.getElementById('yOffset') as HTMLInputElement;
let noiseSeed = document.getElementById('seed') as HTMLInputElement;
let noiseDetail = document.getElementById('detail') as HTMLInputElement;
let noiseFalloff = document.getElementById('falloff') as HTMLInputElement;

// --- default values ---
fill.value = '#FF0000';
height.value = String(Math.round(window.innerWidth * 0.05));
width.value = String(Math.round(window.innerWidth * 0.05));
fn.value = 'noise(x*c, y*c)';
strokeColor.value = '#000000';
strokeWidth.value = '1';
zoom.value = '10';
xOffset.value = '10';
yOffset.value = '10';
noiseSeed.value = String(99);
noiseDetail.value = String(1);
noiseFalloff.value = String(0.9);

const errorUI = new ErrorUI(document.getElementById('fn'), 'span', 'err');

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.appendChild(svg);

// track mouse position
let mouseDown = false;
window.addEventListener('mousedown', function () {
    mouseDown = true;
});
window.addEventListener('mouseup', function () {
    mouseDown = false;
});

function render() {
    svg.innerHTML = ''; // important: clear parent elem on every draw
    errorUI.remove();

    seed(Number(noiseSeed.value));
    detail(Number(noiseDetail.value), Number(noiseFalloff.value));

    let WIDTH = Number(width.value) * Number(zoom.value);
    let HEIGHT = Number(height.value) * Number(zoom.value);
    svg.style.width = String(WIDTH);
    svg.style.height = String(HEIGHT);

    svg.setAttribute('viewBox', `0 0 ${WIDTH + 2} ${HEIGHT + 2}`);

    for (let x = 1; x < WIDTH; x += WIDTH / Number(xOffset.value)) {
        for (let y = 1; y < HEIGHT; y += HEIGHT / Number(yOffset.value)) {
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', String(x));
            rect.setAttribute('y', String(y));
            rect.setAttribute('width', String(WIDTH / Number(xOffset.value)));
            rect.setAttribute('height', String(HEIGHT / Number(yOffset.value)));
            rect.setAttribute('stroke', strokeColor.value);
            rect.setAttribute('stroke-width', strokeWidth.value);
            try {
                rect.setAttribute('fill', calcFill(x, y, fill.value));
            } catch {
                errorUI.create('There is a mistake in your function. Try something else.');
            }
            svg.appendChild(rect);

            rect.addEventListener('click', function () {
                this.remove();
            });
            rect.addEventListener('mouseover', function () {
                if (mouseDown) this.remove();
            });
        }
    }
}

// --- draw first frame ---
render();

// --- redraw grid on input change ---
height.addEventListener('change', () => render());
width.addEventListener('change', () => render());
fill.addEventListener('input', () => render());
fn.addEventListener('input', () => render());
strokeColor.addEventListener('input', () => render());
strokeWidth.addEventListener('input', () => render());
zoom.addEventListener('input', () => render());
xOffset.addEventListener('input', () => render());
yOffset.addEventListener('input', () => render());
noiseDetail.addEventListener('input', () => render());
noiseSeed.addEventListener('input', () => render());
noiseFalloff.addEventListener('input', () => render());

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
const downloadButton = document.getElementById('download');
downloadButton.onclick = () => save(svg, 'gengrid');
