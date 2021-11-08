const componentToHex = (c: number): string => {
   var hex = c.toString(16);
   return hex.length === 1 ? '0' + hex : hex;
};

/**
 * rgb to hex
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 */
export const rgbToHex = (r: number, g: number, b: number) => {
   const _r = componentToHex(r);
   const _g = componentToHex(g);
   const _b = componentToHex(b);
   return '#' + _r + _g + _b;
};

/**
 * hex to rgb
 * @param hex - hex color
 * @returns {
 *  r: number,
 *  g: number,
 *  b: number
 * } rgb color
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   if (!result) return null;
   return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
   };
};
