import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { Film_film$key } from "./__generated__/Film_film.graphql";

const Film: FC<Props> = ({ filmRef }) => {
  const { title } = useFragment(
    graphql`
      fragment Film_film on Film {
        title
      }
    `,
    filmRef
  );

  return <div>Title: {title}</div>;
};

type Props = { filmRef: Film_film$key };

export default Film;
