/**
 * Re-maps a number from one range to another.
 *
 * In the first example above, the number 25 is converted from a value in the
 * range of 0 to 100 into a value that ranges from the left edge of the
 * window (0) to the right edge (width).
 *
 * @method map
 * @param  {Number} value  the incoming value to be converted
 * @param  {Number} start1 lower bound of the value's current range
 * @param  {Number} stop1  upper bound of the value's current range
 * @param  {Number} start2 lower bound of the value's target range
 * @param  {Number} stop2  upper bound of the value's target range
 * @return {Number}        remapped number
 * @alt
 * 10 by 10 white ellipse with in mid left canvas
 * 2 25 by 25 white ellipses move with mouse x. Bottom has more range from X
 */
export const map = (
   n: number,
   start1: number,
   stop1: number,
   start2: number,
   stop2: number
): number => {
   return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
