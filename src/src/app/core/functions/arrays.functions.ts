/**
 * returns an array who`s first value starts with start and ends with end - 1
 * If start > end then they are reversed.
 * If start === end then an empty array is returned;
 * @param start
 * @param end
 */
export function range(start: number, end: number): number[] {
  if (start > end) {
    const aux = start;
    start = end;
    end = aux;
  }
  const len = end - start;
  const arr = new Array(len);
  return [...arr.keys()].map(x => x + start);
}

