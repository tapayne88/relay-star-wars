import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { Film_film$key } from "./__generated__/Film_film.graphql";

const Film: FC<Props> = ({ filmRef }) => {
  const { title, releaseDate, director } = useFragment(
    graphql`
      fragment Film_film on Film {
        title
        releaseDate
        director
      }
    `,
    filmRef
  );

  return (
    <div>
      {releaseDate} <strong>{title}</strong> ({director})
    </div>
  );
};

type Props = { filmRef: Film_film$key };

export default Film;
