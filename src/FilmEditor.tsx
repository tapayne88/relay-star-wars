import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmEditor_films$key } from "./__generated__/FilmEditor_films.graphql";
import { sortByReleaseDateDesc } from "./sorting";
import Film from "./Film";

const FilmEditor: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmEditor_films on Film @relay(plural: true) {
        releaseDate
        ...Film_film
      }
    `,
    filmRefs
  );

  return (
    <div>
      <h2>Selected Film</h2>
      <Film filmRef={sortByReleaseDateDesc(films)[0]} />
    </div>
  );
};

type Props = {
  filmRefs: FilmEditor_films$key;
};

export default FilmEditor;
