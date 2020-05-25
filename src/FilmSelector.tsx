import React, { createContext, useState, useContext, FC } from "react";

type FilmSelectorContext = string | null;
const FilmSelectorRead = createContext<FilmSelectorContext | undefined>(
  undefined
);
const FilmSelectorWrite = createContext<
  ((film: FilmSelectorContext) => void) | undefined
>(undefined);

const FilmSelectorProvider: FC<Props> = ({ children }) => {
  const [selected, setSelected] = useState<FilmSelectorContext>(null);

  const setFilm = (film: FilmSelectorContext) => {
    setSelected(film);
  };

  return (
    <FilmSelectorRead.Provider value={selected}>
      <FilmSelectorWrite.Provider value={setFilm}>
        {children}
      </FilmSelectorWrite.Provider>
    </FilmSelectorRead.Provider>
  );
};

type Props = {};

export const useFilmSelectorRead = (): FilmSelectorContext => {
  const selected = useContext(FilmSelectorRead);
  if (selected === undefined) {
    throw new Error(
      "useFilmSelectorRead needs to be rendered in a tree with FilmSelectorProvider above"
    );
  }
  return selected;
};

export const useFilmSelectorWrite = (): ((
  film: FilmSelectorContext
) => void) => {
  const selected = useContext(FilmSelectorWrite);
  if (selected === undefined) {
    throw new Error(
      "useFilmSelectorWrite needs to be rendered in a tree with FilmSelectorProvider above"
    );
  }
  return selected;
};

export default FilmSelectorProvider;
