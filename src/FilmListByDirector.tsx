import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { sortByDirectorAsc } from "./sorting";
import { FilmListByDirector_films$key } from "./__generated__/FilmListByDirector_films.graphql";
import Film from "./Film";
import FilmListItem from "./FilmListItem";

const FilmListByDirector: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmListByDirector_films on Film @relay(plural: true) {
        id
        director
        ...Film_film
      }
    `,
    filmRefs
  );

  return (
    <ul>
      {sortByDirectorAsc(films).map((film) => (
        <FilmListItem key={film.id} id={film.id}>
          <Film filmRef={film} />
        </FilmListItem>
      ))}
    </ul>
  );
};

type Props = {
  filmRefs: FilmListByDirector_films$key;
};

export default FilmListByDirector;
