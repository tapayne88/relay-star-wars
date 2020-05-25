import React, { createContext, useState, useContext, FC } from "react";

type ValuesOf<T> = T extends ReadonlyArray<infer U> ? U : never;
export const filmSorts = ["title", "releaseDate"] as const;
export const defaultSort = filmSorts[0];

export type FilmSortContext = ValuesOf<typeof filmSorts>;

const FilmSortRead = createContext<FilmSortContext | undefined>(undefined);
const FilmSortWrite = createContext<
  ((sort: FilmSortContext) => void) | undefined
>(undefined);

const FilmSortProvider: FC = ({ children }) => {
  const [selected, setSelected] = useState<FilmSortContext>(defaultSort);

  const setSort = (sort: FilmSortContext) => {
    setSelected(sort);
  };

  return (
    <FilmSortRead.Provider value={selected}>
      <FilmSortWrite.Provider value={setSort}>
        {children}
      </FilmSortWrite.Provider>
    </FilmSortRead.Provider>
  );
};

export const useFilmSortRead = () => {
  const selected = useContext(FilmSortRead);
  if (selected === undefined) {
    throw new Error(
      "useFilmSortRead needs to be rendered in a tree with FilmSortProvider above"
    );
  }
  return selected;
};

export const useFilmSortWrite = () => {
  const setSort = useContext(FilmSortWrite);
  if (setSort === undefined) {
    throw new Error(
      "useFilmSortWrite needs to be rendered in a tree with FilmSortProvider above"
    );
  }
  return setSort;
};

export default FilmSortProvider;
