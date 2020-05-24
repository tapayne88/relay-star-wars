import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmDetailsReleaseDate_film$key } from "./__generated__/FilmDetailsReleaseDate_film.graphql";

const FilmDetailsReleaseDate: FC<Props> = ({ filmRef }) => {
  const { releaseDate } = useFragment(
    graphql`
      fragment FilmDetailsReleaseDate_film on Film {
        releaseDate
      }
    `,
    filmRef
  );

  return (
    <>
      <dt>Release Date</dt>
      <dd>{releaseDate}</dd>
    </>
  );
};

type Props = {
  filmRef: FilmDetailsReleaseDate_film$key;
};

export default FilmDetailsReleaseDate;
