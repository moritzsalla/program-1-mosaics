/**
 * @function map
 *
 * @description
 * Re-maps a number from one range to another.
 *
 * In the first example above, the number 25 is converted from a value in the
 * range of 0 to 100 into a value that ranges from the left edge of the
 * window (0) to the right edge (width).
 *
 * @param n the incoming value to be converted
 * @param start1 lower bound of the value's current range
 * @param stop1  upper bound of the value's current range
 * @param start2 lower bound of the value's target range
 * @param stop2  upper bound of the value's target range
 *
 * @return remapped number
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
