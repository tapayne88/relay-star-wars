import React, { createContext, useState, useContext, FC } from "react";

const FilmSortRead = createContext<string | null | undefined>(undefined);
const FilmSortWrite = createContext<((sort: string) => void) | undefined>(
  undefined
);

const FilmSortProvider: FC = ({ children }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const setSort = (sort: string) => {
    sort !== "" ? setSelected(sort) : setSelected(null);
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
