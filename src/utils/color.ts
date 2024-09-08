import { PROGRAM_ELEMENT_REGISTRY } from '../config';

const componentToHex = (c: number): string => {
   const hex = c.toString(16);
   return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number) => {
   const _r = componentToHex(r);
   const _g = componentToHex(g);
   const _b = componentToHex(b);
   return '#' + _r + _g + _b;
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   if (!result) return null;
   return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
   };
};

export const setBackgroundColor = () => {
   document.body.style.backgroundColor = PROGRAM_ELEMENT_REGISTRY.bg.value;
};
