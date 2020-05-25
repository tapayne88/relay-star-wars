import React, { FC } from "react";
import { useFilmSortWrite } from "./FilmSort";

const FilmListSort: FC = () => {
  const setSort = useFilmSortWrite();

  return (
    <div>
      <h4>Sort Films</h4>
      <select
        defaultValue={sortOptions[0]}
        onChange={(event) => setSort(event.target.value)}
      >
        {sortOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

const sortOptions = ["name", "releaseDate"] as const;

export default FilmListSort;
