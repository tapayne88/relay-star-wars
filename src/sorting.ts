import { sort } from "ramda";

const parseDate = (date: string | null): number =>
  date !== null ? new Date(date).valueOf() : Number.MIN_VALUE;

export const sortByReleaseDateDesc = <T extends { releaseDate: string | null }>(
  arr: readonly T[]
): readonly T[] =>
  sort((a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate), arr);

const compareStrings = (a: string, b: string): number => {
  if (a === "" && b === "") {
    return 0;
  }

  if (a === "") {
    return 1;
  }

  if (b === "") {
    return -1;
  }

  const aFirst = a.charCodeAt(0);
  const bFirst = b.charCodeAt(0);
  if (aFirst === bFirst) {
    return compareStrings(a.slice(1), b.slice(1));
  }

  return aFirst - bFirst;
};

export const sortByNameAsc = <T extends { name: string | null }>(
  arr: readonly T[]
): readonly T[] =>
  sort((a, b) => {
    if (a.name === null && b.name === null) {
      return 0;
    }
    if (a.name === null) {
      return 1;
    }
    if (b.name === null) {
      return -1;
    }
    return compareStrings(a.name, b.name);
  }, arr);
