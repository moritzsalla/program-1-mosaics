import { map } from 'src/math/map';
import { noise } from 'src/math/simplexNoise';
import { hexToRgb, rgbToHex } from 'src/utils/colorConverter';

const { sin, cos, tan, floor, ceil, round } = Math;

const write = (x: number, y: number, c: number) => {
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
};

export const setFill = (x: number, y: number, hex: string): string => {
   const r = write(x, y, hexToRgb(hex).r);
   const g = write(x, y, hexToRgb(hex).g);
   const b = write(x, y, hexToRgb(hex).b);
   return rgbToHex(r, g, b);
};
