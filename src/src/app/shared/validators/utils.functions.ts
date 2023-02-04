export function intervalKeys(min: number | undefined, max: number | undefined,
                             scope: string): string | undefined {
  if (min === undefined && max === undefined) {
    return undefined;
  } else if (min === undefined) {
    return max === 1 ? `${scope}.max.singular` : `${scope}.max.plural`;
  } else if (max === undefined) {
    return min === 1 ? `${scope}.min.singular` : `${scope}.min.plural`;
  } else if (max === min) {
    return min === 1 ? `${scope}.exactly.singular` : `${scope}.exactly.plural`;
  } else {
    return `${scope}.between`;
  }

}
