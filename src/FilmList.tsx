import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmList_films$key } from "./__generated__/FilmList_films.graphql";
import Film from "./Film";

const FilmList: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmList_films on Film @relay(plural: true) {
        id
        ...Film_film
      }
    `,
    filmRefs
  );

  return (
    <ul>
      {films.map((film) => (
        <li key={film.id}>
          <Film filmRef={film} />
        </li>
      ))}
    </ul>
  );
};

type Props = {
  filmRefs: FilmList_films$key;
};

export default FilmList;
