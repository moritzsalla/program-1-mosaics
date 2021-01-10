import { hexToRgb, rgbToHex } from '../utils/colorConverter';
import { map } from './map';
import { noise, seed, detail } from './simplexNoise';

// do not remove x and y vars, they are needed for fn input
export function calcFill(x: number, y: number, hex: string) {
    let newC = {
        r: calcNoise(x, y, hexToRgb(hex).r),
        g: calcNoise(x, y, hexToRgb(hex).g),
        b: calcNoise(x, y, hexToRgb(hex).b),
    };

    return rgbToHex(newC.r, newC.b, newC.g);
}

function calcNoise(x: number, y: number, c: number) {
    let newC = new Function('noise', 'x', 'y', 'c', `return noise(${fn.value})`)(noise, x, y, c);
    newC = map(newC, 0, 1, 0, 255);
    newC = Math.round(newC);
    return newC;
}
