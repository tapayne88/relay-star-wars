import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { Film_film$key } from "./__generated__/Film_film.graphql";

const Film: FC<Props> = ({ filmRef }) => {
  const { title, releaseDate } = useFragment(
    graphql`
      fragment Film_film on Film {
        title
        releaseDate
      }
    `,
    filmRef
  );

  return (
    <div>
      <dt>Title</dt>
      <dd>{title}</dd>

      <dt>Release Date</dt>
      <dd>{releaseDate}</dd>
    </div>
  );
};

type Props = { filmRef: Film_film$key };

export default Film;
