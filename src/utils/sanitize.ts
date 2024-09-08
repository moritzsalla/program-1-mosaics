import { hexToRgb, rgbToHex } from './color';
import { map } from '../math/map';
import { noise } from '../math/simplex';

const { sin, cos, tan, floor, ceil, round } = Math;

const writeColor = (x: number, y: number, c: number) => {
   try {
      let color = new Function(
         'x',
         'y',
         'c',
         'noise',
         'sin',
         'cos',
         'tan',
         'floor',
         'ceil',
         'round',
         `return ${fn.value}`
      )(x, y, c, noise, sin, cos, tan, floor, ceil, round);

      color = map(color, 0, 1, 0, 255);
      color = round(color);

      return color;
   } catch (error) {
      console.error('Failed to write color', error);

      return 0;
   }
};

export const setFill = (x: number, y: number, hex: string): string => {
   const r = writeColor(x, y, hexToRgb(hex).r);
   const g = writeColor(x, y, hexToRgb(hex).g);
   const b = writeColor(x, y, hexToRgb(hex).b);

   return rgbToHex(r, g, b);
};
