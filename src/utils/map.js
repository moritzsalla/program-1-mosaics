export function map(n, start1, stop1, start2, stop2, withinBounds) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
