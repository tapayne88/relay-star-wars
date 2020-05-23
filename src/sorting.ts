import { sort } from "ramda";

const parseDate = (date: string | null): number =>
  date !== null ? new Date(date).valueOf() : Number.MIN_VALUE;

export const sortByReleaseDateDesc = <T extends { releaseDate: string | null }>(
  arr: readonly T[]
): readonly T[] =>
  sort((a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate), arr);
