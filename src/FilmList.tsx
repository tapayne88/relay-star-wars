import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmList_films$key } from "./__generated__/FilmList_films.graphql";
import { filmHasSpecie } from "./filtering";
import { useFilterSpecieRead } from "./SpeciesFilter";
import FilmListByTitle from "./FilmListByTitle";
import FilmListByReleaseDate from "./FilmListByReleaseDate";
import { useFilmSortRead } from "./FilmSort";

const FilmList: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmList_films on Film @relay(plural: true) {
        ...FilmListByTitle_films
        ...FilmListByReleaseDate_films
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
  const sort = useFilmSortRead();

  const filmList = specieFilter
    ? films.filter(filmHasSpecie(specieFilter))
    : films;

  if (sort === "title") {
    return <FilmListByTitle filmRefs={filmList} />;
  }

  return <FilmListByReleaseDate filmRefs={filmList} />;
};

type Props = {
  filmRefs: FilmList_films$key;
};

export default FilmList;
