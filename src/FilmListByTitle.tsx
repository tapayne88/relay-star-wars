import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { sortByTitleAsc } from "./sorting";
import { FilmListByTitle_films$key } from "./__generated__/FilmListByTitle_films.graphql";
import Film from "./Film";
import FilmListItem from "./FilmListItem";

const FilmListByTitle: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmListByTitle_films on Film @relay(plural: true) {
        id
        title
        ...Film_film
      }
    `,
    filmRefs
  );

  return (
    <ul>
      {sortByTitleAsc(films).map((film) => (
        <FilmListItem key={film.id} id={film.id}>
          <Film film={film} />
        </FilmListItem>
      ))}
    </ul>
  );
};

type Props = {
  filmRefs: FilmListByTitle_films$key;
};

export default FilmListByTitle;
