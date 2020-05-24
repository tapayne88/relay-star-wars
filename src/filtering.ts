export const isNotNullable = <T extends unknown>(
  value: T | null | undefined
): value is T => typeof value !== "undefined" && value !== null;
