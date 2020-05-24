import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { sortByReleaseDateDesc } from "./sorting";
import { FilmList_films$key } from "./__generated__/FilmList_films.graphql";
import Film from "./Film";
import FilmListItem from "./FilmListItem";
import { useFilterSpecieRead } from "./FilmListFilter";
import { filmHasSpecie } from "./filtering";

const FilmList: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmList_films on Film @relay(plural: true) {
        id
        releaseDate
        ...Film_film
        speciesConnection {
          species {
            name
          }
        }
      }
    `,
    filmRefs
  );
  const specieFilter = useFilterSpecieRead();

  const filmList = specieFilter
    ? films.filter(filmHasSpecie(specieFilter))
    : films;

  return (
    <ul>
      {sortByReleaseDateDesc(filmList).map((film) => (
        <FilmListItem key={film.id} id={film.id}>
          <Film filmRef={film} />
        </FilmListItem>
      ))}
    </ul>
  );
};

type Props = {
  filmRefs: FilmList_films$key;
};

export default FilmList;
