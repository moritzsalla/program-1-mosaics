import { hexToRgb, rgbToHex } from '../utils/colorConverter';
import { map } from './map';
import { noise, noiseSeed } from './noise';

// do not remove x and y vars, they are needed for fn input
export function calcFill(c, x, y) {
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
