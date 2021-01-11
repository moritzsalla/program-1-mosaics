import { hexToRgb, rgbToHex } from '../utils/colorConverter';
import { map } from './map';
import { noise, seed, detail } from './simplexNoise';

const { sin, cos, tan, floor, ceil, round } = Math;

function calcNoise(x: number, y: number, c: number) {
    let newC = new Function(
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
    newC = map(newC, 0, 1, 0, 255);
    newC = Math.round(newC);
    return newC;
}

// do not remove x and y vars, they are needed for fn input
export function calcFill(x: number, y: number, hex: string) {
    let newC = {
        r: calcNoise(x, y, hexToRgb(hex).r),
        g: calcNoise(x, y, hexToRgb(hex).g),
        b: calcNoise(x, y, hexToRgb(hex).b),
    };

    return rgbToHex(newC.r, newC.b, newC.g);
}
