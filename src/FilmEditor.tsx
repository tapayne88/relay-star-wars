import React, { FC, useRef } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmEditor_films$key } from "./__generated__/FilmEditor_films.graphql";

const FilmEditor: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmEditor_films on Film @relay(plural: true) {
        title
        releaseDate
      }
    `,
    filmRefs
  );
  const titleRef = useRef<HTMLInputElement>(null!);
  const releaseDateRef = useRef<HTMLInputElement>(null!);

  const { releaseDate, title } = films[0];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Selected Film</h2>

      <label htmlFor="title">Title</label>
      <input name="title" defaultValue={title!} ref={titleRef} />

      <label htmlFor="releaseDate">Release Date</label>
      <input
        name="releaseDate"
        defaultValue={releaseDate!}
        ref={releaseDateRef}
      />

      <button
        onClick={() =>
          console.log(
            "I don't do anything yet!",
            releaseDateRef.current.value,
            titleRef.current.value
          )
        }
      >
        Update!
      </button>
    </div>
  );
};

type Props = {
  filmRefs: FilmEditor_films$key;
};

export default FilmEditor;
