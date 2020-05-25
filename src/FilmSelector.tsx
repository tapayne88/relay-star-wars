import React, { createContext, useState, useContext, FC } from "react";

const FilmSelectorRead = createContext<string | null>(null);
const FilmSelectorWrite = createContext<((film: string) => void) | null>(null);

const FilmSelectorProvider: FC<Props> = ({ initialValue, children }) => {
  const [selected, setSelected] = useState(initialValue);

  const setFilm = (film: string) => {
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

type Props = {
  initialValue: string;
};

export const useFilmSelectorRead = (): string => {
  const selected = useContext(FilmSelectorRead);
  if (selected === null) {
    throw new Error(
      "useFilmSelectorRead needs to be rendered in a tree with FilmSelectorProvider above"
    );
  }
  return selected;
};

export const useFilmSelectorWrite = (): ((film: string) => void) => {
  const selected = useContext(FilmSelectorWrite);
  if (selected === null) {
    throw new Error(
      "useFilmSelectorWrite needs to be rendered in a tree with FilmSelectorProvider above"
    );
  }
  return selected;
};

export default FilmSelectorProvider;
