export const isNotNullable = <T extends unknown>(
  value: T | null | undefined
): value is T => typeof value !== "undefined" && value !== null;

export const filmHasSpecie = <
  T extends {
    readonly speciesConnection: {
      readonly species:
        | readonly ({ readonly name: string | null } | null)[]
        | null;
    } | null;
  }
>(
  specie: string
) => (film: T) =>
  film?.speciesConnection?.species?.find((s) => s?.name === specie);
