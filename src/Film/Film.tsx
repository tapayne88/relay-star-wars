import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Film_film } from "./__generated__/Film_film.graphql";

const Film: FC<Props> = ({ film: { title, releaseDate, director } }) => {
  return (
    <div>
      {releaseDate} <strong>{title}</strong> ({director})
    </div>
  );
};

type Props = { film: Film_film };

export default createFragmentContainer(Film, {
  film: graphql`
    fragment Film_film on Film {
      title
      releaseDate
      director
    }
  `,
});
