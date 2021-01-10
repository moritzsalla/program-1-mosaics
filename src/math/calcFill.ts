import { hexToRgb, rgbToHex } from '../utils/colorConverter';
import { map } from './map';
import { noise, noiseSeed } from './noise';

// do not remove x and y vars, they are needed for fn input
export function calcFill(x: number, y: number, hex: string) {
    noiseSeed(1); // comment out for random seed

    let newC = {
        r: calcNoise(x, y, hexToRgb(hex).r),
        g: calcNoise(x, y, hexToRgb(hex).g),
        b: calcNoise(x, y, hexToRgb(hex).b),
    };

    return rgbToHex(newC.r, newC.b, newC.g);
}

function calcNoise(x: number, y: number, c: number) {
    let newC = new Function('x', 'y', 'c', 'noise', 'bla', fn.value)(x, y, c, noise);
    newC = map(newC, 0, 1, 0, 255);
    newC = Math.round(newC);
    return newC;
}
