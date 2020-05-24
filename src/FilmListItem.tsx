import React, { FC } from "react";
import { useFilmSelectorRead, useFilmSelectorWrite } from "./FilmSelector";

const FilmListItem: FC<Props> = ({ id, children }) => {
  const selected = useFilmSelectorRead();
  const setSelected = useFilmSelectorWrite();

  return (
    <li
      style={selected === id ? { border: "1px solid red" } : {}}
      onClick={() => setSelected(id)}
    >
      {children}
    </li>
  );
};

type Props = {
  id: string;
};

export default FilmListItem;
