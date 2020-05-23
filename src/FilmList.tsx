import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { sort } from "ramda";
import { FilmList_films$key } from "./__generated__/FilmList_films.graphql";
import Film from "./Film";

const FilmList: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmList_films on Film @relay(plural: true) {
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

const parseDate = (date: string | null): number =>
  date !== null ? new Date(date).valueOf() : Number.MIN_VALUE;

const sortByReleaseDateDesc = <T extends { releaseDate: string | null }>(
  arr: readonly T[]
): readonly T[] =>
  sort((a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate), arr);

export default FilmList;
