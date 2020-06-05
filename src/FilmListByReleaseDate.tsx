import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { sortByReleaseDateDesc } from "./sorting";
import { FilmListByReleaseDate_films$key } from "./__generated__/FilmListByReleaseDate_films.graphql";
import Film from "./Film";
import FilmListItem from "./FilmListItem";

const FilmListByReleaseDate: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmListByReleaseDate_films on Film @relay(plural: true) {
        id
        releaseDate
        ...Film_film
      }
    `,
    filmRefs
  );

  return (
    <ul>
      {sortByReleaseDateDesc(films).map((film) => (
        <FilmListItem key={film.id} id={film.id}>
          <Film film={film} />
        </FilmListItem>
      ))}
    </ul>
  );
};

type Props = {
  filmRefs: FilmListByReleaseDate_films$key;
};

export default FilmListByReleaseDate;
