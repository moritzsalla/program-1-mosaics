import '98.css/dist/98.css';
import { setFill } from './utils/sanitize';
import { detail, seed } from './math/simplex';
import { rgbToHex } from './utils/color';
import { dragElement } from './utils/interaction';
import { ErrorUI } from './ErrorUI';
import { save } from './utils/svg';

const zoom = document.getElementById('zoom') as HTMLInputElement;
const height = document.getElementById('height') as HTMLInputElement;
const width = document.getElementById('width') as HTMLInputElement;
const fill = document.getElementById('fill') as HTMLInputElement;
const fn = document.getElementById('fn') as HTMLInputElement;
const strokeColor = document.getElementById('strokeColor') as HTMLInputElement;
const strokeWidth = document.getElementById('strokeWidth') as HTMLInputElement;
const xOffset = document.getElementById('xOffset') as HTMLInputElement;
const yOffset = document.getElementById('yOffset') as HTMLInputElement;
const noiseSeed = document.getElementById('seed') as HTMLInputElement;
const noiseDetail = document.getElementById('detail') as HTMLInputElement;
const noiseFalloff = document.getElementById('falloff') as HTMLInputElement;

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

const error = new ErrorUI(document.getElementById('fn'), 'span', 'err');

const SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.appendChild(SVG);

const setBGColor = () => {
   document.body.style.backgroundColor = bg.value;
};

// track mouse position
let mouseDown = false;

window.addEventListener('mousedown', () => {
   mouseDown = true;
});
window.addEventListener('mouseup', () => {
   mouseDown = false;
});

// defaults
seed(Number(noiseSeed.value));
detail(Number(noiseDetail.value), Number(noiseFalloff.value));

const render = () => {
   // clear parent elem on every draw
   SVG.innerHTML = '';
   error.remove();

   const WIDTH = Number(width.value) * Number(zoom.value);
   const HEIGHT = Number(height.value) * Number(zoom.value);

   SVG.style.width = String(WIDTH);
   SVG.style.height = String(HEIGHT);

   SVG.setAttribute('viewBox', `0 0 ${WIDTH + 2} ${HEIGHT + 2}`);

   for (let x = 1; x < WIDTH; x += WIDTH / Number(xOffset.value)) {
      for (let y = 1; y < HEIGHT; y += HEIGHT / Number(yOffset.value)) {
         const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

         rect.setAttribute('x', String(x));
         rect.setAttribute('y', String(y));
         rect.setAttribute('width', String(WIDTH / Number(xOffset.value)));
         rect.setAttribute('height', String(HEIGHT / Number(yOffset.value)));
         rect.setAttribute('stroke', strokeColor.value);
         rect.setAttribute('stroke-width', strokeWidth.value);

         try {
            rect.setAttribute('fill', setFill(x, y, fill.value));
         } catch {
            error.create('There is a mistake in your function. Try something else.');
         }

         SVG.appendChild(rect);

         rect.addEventListener('click', function () {
            this.remove();
         });

         rect.addEventListener('mouseover', function () {
            if (mouseDown) this.remove();
         });
      }
   }
};
render();

// --- redraw grid on input change ---
const changeListeners = [height, width];
const inputListeners = [
   fill,
   fn,
   strokeColor,
   strokeWidth,
   xOffset,
   yOffset,
   zoom,
   noiseSeed,
   noiseDetail,
   noiseFalloff,
];

const addListeners = (elems: HTMLInputElement[], type: string, callback: () => void): void[] => {
   if (!elems || !type) return;

   const addListener = (elem: HTMLInputElement): void => {
      elem.addEventListener(type, callback);
   };
   return elems.map(addListener);
};

addListeners(changeListeners, 'change', render);
addListeners(inputListeners, 'input', render);

// --- set background color ---
const bg = document.getElementById('bg') as HTMLInputElement;
bg.value = rgbToHex(30, 30, 30);
bg.addEventListener('input', () => setBGColor());
setBGColor();

// --- make UI draggeable ---
dragElement(document.querySelector('.title-bar'), document.querySelector('.window'));

// --- download button ---
const downloadButton = document.getElementById('download');
downloadButton.onclick = () => save(SVG, 'gengrid');
