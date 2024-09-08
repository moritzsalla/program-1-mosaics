import { ErrorUI } from './ErrorUI';

import { PROGRAM_ELEMENT_REGISTRY } from './config';

import { setFill } from './utils/sanitize';
import { save } from './utils/svg';
import { dragElement } from './utils/interaction';
import { rgbToHex, setBackgroundColor } from './utils/color';

import { detail, seed } from './math/simplex';
import { debounce } from './utils/debounce';

const execute = () => {
   const initializeFormValues = () => {
      PROGRAM_ELEMENT_REGISTRY.fill.value = '#FF0000';
      PROGRAM_ELEMENT_REGISTRY.height.value = String(Math.round(window.innerWidth * 0.05));
      PROGRAM_ELEMENT_REGISTRY.width.value = String(Math.round(window.innerWidth * 0.05));
      PROGRAM_ELEMENT_REGISTRY.fn.value = 'noise(x*c, y*c)';
      PROGRAM_ELEMENT_REGISTRY.strokeColor.value = '#000000';
      PROGRAM_ELEMENT_REGISTRY.strokeWidth.value = '1';
      PROGRAM_ELEMENT_REGISTRY.zoom.value = '10';
      PROGRAM_ELEMENT_REGISTRY.xOffset.value = '10';
      PROGRAM_ELEMENT_REGISTRY.yOffset.value = '10';
      PROGRAM_ELEMENT_REGISTRY.noiseSeed.value = String(99);
      PROGRAM_ELEMENT_REGISTRY.noiseDetail.value = String(1);
      PROGRAM_ELEMENT_REGISTRY.noiseFalloff.value = String(0.9);
      PROGRAM_ELEMENT_REGISTRY.bg.value = rgbToHex(30, 30, 30);
   };

   const setInitialNoiseValues = () => {
      seed(Number(PROGRAM_ELEMENT_REGISTRY.noiseSeed.value));
      detail(Number(PROGRAM_ELEMENT_REGISTRY.noiseDetail.value), Number(PROGRAM_ELEMENT_REGISTRY.noiseFalloff.value));
   };

   initializeFormValues();
   setInitialNoiseValues();

   // Create SVG element
   const SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   document.body.appendChild(SVG);

   // Create error UI
   const error = new ErrorUI(PROGRAM_ELEMENT_REGISTRY.fn, 'span', 'err');

   // Mouse down state
   let mouseDown = false;
   window.addEventListener('mousedown', () => {
      mouseDown = true;
   });
   window.addEventListener('mouseup', () => {
      mouseDown = false;
   });

   const render = () => {
      SVG.innerHTML = '';
      error.remove();

      const WIDTH = Number(PROGRAM_ELEMENT_REGISTRY.width.value) * Number(PROGRAM_ELEMENT_REGISTRY.zoom.value);
      const HEIGHT = Number(PROGRAM_ELEMENT_REGISTRY.height.value) * Number(PROGRAM_ELEMENT_REGISTRY.zoom.value);

      SVG.style.width = `${WIDTH}px`;
      SVG.style.height = `${HEIGHT}px`;
      SVG.setAttribute('viewBox', `0 0 ${WIDTH + 2} ${HEIGHT + 2}`);

      const rectWidth = WIDTH / Number(PROGRAM_ELEMENT_REGISTRY.xOffset.value);
      const rectHeight = HEIGHT / Number(PROGRAM_ELEMENT_REGISTRY.yOffset.value);

      const fragment = document.createDocumentFragment();

      for (let x = 1; x < WIDTH; x += rectWidth) {
         for (let y = 1; y < HEIGHT; y += rectHeight) {
            const rect = createRectElement(x, y, rectWidth, rectHeight);
            fragment.appendChild(rect);
         }
      }

      SVG.appendChild(fragment);
   };

   const createRectElement = (x: number, y: number, width: number, height: number) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(width));
      rect.setAttribute('height', String(height));
      rect.setAttribute('stroke', PROGRAM_ELEMENT_REGISTRY.strokeColor.value);
      rect.setAttribute('stroke-width', PROGRAM_ELEMENT_REGISTRY.strokeWidth.value);

      try {
         rect.setAttribute('fill', setFill(x, y, PROGRAM_ELEMENT_REGISTRY.fill.value));
      } catch {
         error.create('There is a mistake in your function. Try something else.');
      }

      rect.addEventListener('click', function () {
         this.remove();
      });
      rect.addEventListener('mouseover', function () {
         if (mouseDown) this.remove();
      });

      return rect;
   };

   // Debounced render function
   const debouncedRender = debounce(render, 100);

   // Add event listeners
   const addListeners = (elems: HTMLInputElement[], type: string, callback: () => void) => {
      elems.forEach((elem) => elem.addEventListener(type, callback));
   };

   addListeners([PROGRAM_ELEMENT_REGISTRY.height, PROGRAM_ELEMENT_REGISTRY.width], 'change', debouncedRender);
   addListeners(
      Object.values(PROGRAM_ELEMENT_REGISTRY).filter(
         (el): el is HTMLInputElement =>
            el instanceof HTMLInputElement && el !== PROGRAM_ELEMENT_REGISTRY.bg && el !== PROGRAM_ELEMENT_REGISTRY.downloadButton
      ),
      'input',
      debouncedRender
   );

   // Set up background color
   PROGRAM_ELEMENT_REGISTRY.bg.addEventListener('input', setBackgroundColor);
   setBackgroundColor();

   // Make window draggable
   dragElement(document.querySelector('.title-bar'), document.querySelector('.window'));

   // Set up download button
   PROGRAM_ELEMENT_REGISTRY.downloadButton.onclick = () => save(SVG, 'gengrid');

   // Initial render
   render();
};

export default {
   execute: () => {
      execute();
      console.log('Program executed');
   },
};
