import '98.css/dist/98.css';
import { hexToRgb, rgbToHex } from './utils/colorConverter';
import { disableInput } from './utils/disableInput';
import { dragElement } from './utils/draggeable';
import { map } from './utils/map';
import { noise, noiseSeed } from './utils/noise';
import { save } from './utils/saveSvg';

// --- make UI draggeable
dragElement(document.querySelector('.title-bar'), document.querySelector('.window'));

// --- get input elems
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
let type = document.querySelector('.type') as HTMLInputElement;
let xOffset = document.getElementById('xOffset') as HTMLInputElement;
let yOffset = document.getElementById('yOffset') as HTMLInputElement;

// --- set input default vals
fill.value = '#FF0000';
height.value = '17';
width.value = '145';
fn.value = 'Math.sin(c*x*y) + 10';
strokeColor.value = '#000000';
strokeWidth.value = '0';
resolution.value = '12';
zoom.value = '8';
xOffset.value = '8';
yOffset.value = '1';

// --- this is the drawing loop
let svg = document.getElementById('svgWrapper');

function render() {
    svg.innerHTML = ''; // important: clear parent elem on every draw

    let WIDTH = Number(width.value) * Number(zoom.value);
    let HEIGHT = Number(height.value) * Number(zoom.value);
    svg.style.width = String(WIDTH);
    svg.style.height = String(HEIGHT);

    svg.setAttribute('viewBox', `0 0 ${WIDTH + 2} ${HEIGHT + 2}`);

    for (let x = 1; x < WIDTH; x += WIDTH / Number(resolution.value) / Number(xOffset.value)) {
        for (
            let y = 1;
            y < HEIGHT;
            y += HEIGHT / Number(resolution.value) / Number(yOffset.value)
        ) {
            if (rect.checked) {
                let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', String(x));
                rect.setAttribute('y', String(y));
                rect.setAttribute(
                    'width',
                    String(WIDTH / Number(resolution.value) / Number(xOffset.value))
                );
                rect.setAttribute(
                    'height',
                    String(HEIGHT / Number(resolution.value) / Number(yOffset.value))
                );
                rect.setAttribute('stroke', strokeColor.value);
                rect.setAttribute('stroke-width', strokeWidth.value);
                rect.setAttribute('fill', calcFill(fill.value, x, y));
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
                circle.setAttribute('fill', calcFill(fill.value, x, y));
                svg.appendChild(circle);
            } else {
                disableInput(strokeColor, false);
                disableInput(strokeWidth, false);
            }
        }
    }
}

// do not remove x and y vars, they are needed for fn input
function calcFill(c, x, y) {
    noiseSeed(1); // comment out for random seed

    try {
        function calcNoise(c) {
            c = noise(eval(fn.value)); // to-do: how do you expose functions in eval?
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
        throw new Error(
            `Could not calculate noise from the given input variables: ${fn.value}. This is likely a user error.`
        );
    }
}

// --- draw first frame
render();

// --- redraw grid on input change
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

// --- download button
const downloadButton = document.getElementById('download');
downloadButton.onclick = () => save(svg, 'gengrid');
