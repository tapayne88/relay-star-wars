import React, { createContext, useState, useContext, FC } from "react";

type ValuesOf<T> = T extends ReadonlyArray<infer U> ? U : never;
export const filmSorts = [
  { key: "releaseDate", name: "Release Date" },
  { key: "title", name: "Title" },
  { key: "director", name: "Director" },
] as const;
export const defaultSort = filmSorts[0];

export type FilmSortContext = ValuesOf<typeof filmSorts>;
export type FilmSortContextWrite = FilmSortContext["key"];

const FilmSortRead = createContext<FilmSortContext | undefined>(undefined);
const FilmSortWrite = createContext<
  ((sort: FilmSortContextWrite) => void) | undefined
>(undefined);

const FilmSortProvider: FC = ({ children }) => {
  const [selected, setSelected] = useState<FilmSortContext>(defaultSort);

  const setSort = (key: FilmSortContextWrite) => {
    const sort = filmSorts.find((sort) => sort.key === key)!;
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
