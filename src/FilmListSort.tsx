import React, { FC } from "react";
import {
  useFilmSortWrite,
  filmSorts,
  defaultSort,
  FilmSortContextWrite,
} from "./FilmSort";

const FilmListSort: FC = () => {
  const setSort = useFilmSortWrite();

  return (
    <div>
      <h4>Sort Films</h4>
      <select
        defaultValue={defaultSort.key}
        onChange={(event) =>
          setSort(event.target.value as FilmSortContextWrite)
        }
      >
        {filmSorts.map((sort) => (
          <option key={sort.key} value={sort.key}>
            {sort.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilmListSort;
