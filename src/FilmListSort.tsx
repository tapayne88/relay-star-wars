import React, { FC } from "react";
import {
  useFilmSortWrite,
  filmSorts,
  defaultSort,
  FilmSortContext,
} from "./FilmSort";

const FilmListSort: FC = () => {
  const setSort = useFilmSortWrite();

  return (
    <div>
      <h4>Sort Films</h4>
      <select
        defaultValue={defaultSort}
        onChange={(event) => setSort(event.target.value as FilmSortContext)}
      >
        {filmSorts.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilmListSort;
