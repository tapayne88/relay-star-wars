import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";
import { FilmDetails_filmQuery } from "./__generated__/FilmDetails_filmQuery.graphql";
import { useFilmSelectorRead } from "./FilmSelector";

const FilmDetails: FC = () => {
  const selected = useFilmSelectorRead();
  const data = useLazyLoadQuery<FilmDetails_filmQuery>(
    graphql`
      query FilmDetails_filmQuery($filmId: ID!) {
        film(id: $filmId) {
          title
          episodeID
          director
          releaseDate
        }
      }
    `,
    { filmId: selected }
  );

  const film = data?.film;

  if (!film) {
    return <>:shrug:</>;
  }

  const { title, episodeID, director, releaseDate } = film;

  return (
    <dl>
      <dt>Title</dt>
      <dd>{title}</dd>

      <dt>Episode ID</dt>
      <dd>{episodeID}</dd>

      <dt>Director</dt>
      <dd>{director}</dd>

      <dt>Release Date</dt>
      <dd>{releaseDate}</dd>
    </dl>
  );
};

export default FilmDetails;
