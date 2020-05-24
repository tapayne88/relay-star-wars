import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";
import { FilmDetails_filmQuery } from "./__generated__/FilmDetails_filmQuery.graphql";
import { useFilmSelectorRead } from "./FilmSelector";
import Species from "./Species";
import { isNotNullable } from "./filtering";
import FilmDetailsReleaseDate from "./FilmDetailsReleaseDate";

const FilmDetails: FC = () => {
  const selected = useFilmSelectorRead();
  const data = useLazyLoadQuery<FilmDetails_filmQuery>(
    graphql`
      query FilmDetails_filmQuery($filmId: ID!) {
        film(id: $filmId) {
          ...FilmDetailsReleaseDate_film
          title
          episodeID
          director
          speciesConnection {
            species {
              ...Species_species
            }
          }
        }
      }
    `,
    { filmId: selected }
  );

  const film = data?.film;

  if (!film) {
    return <>:shrug:</>;
  }

  const { title, episodeID, director, speciesConnection } = film;

  const species = speciesConnection?.species?.filter(isNotNullable);

  return (
    <dl>
      <dt>Title</dt>
      <dd>{title}</dd>

      <dt>Episode ID</dt>
      <dd>{episodeID}</dd>

      <dt>Director</dt>
      <dd>{director}</dd>

      <FilmDetailsReleaseDate filmRef={film} />

      {species && <Species speciesRefs={species} />}
    </dl>
  );
};

export default FilmDetails;
