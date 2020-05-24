import React, { FC, useRef } from "react";
import graphql from "babel-plugin-relay/macro";
import { commitLocalUpdate } from "react-relay";
import { useFragment } from "react-relay/hooks";
import { FilmEditor_films$key } from "./__generated__/FilmEditor_films.graphql";
import RelayEnvironment from "./RelayEnvironment";
import { useFilmSelectorRead } from "./FilmSelector";

const FilmEditor: FC<Props> = ({ filmRefs }) => {
  const films = useFragment(
    graphql`
      fragment FilmEditor_films on Film @relay(plural: true) {
        id
        title
        releaseDate
      }
    `,
    filmRefs
  );
  const selected = useFilmSelectorRead();
  const film = films.find(({ id }) => id === selected)!;

  const titleRef = useRef<HTMLInputElement>(null!);
  const releaseDateRef = useRef<HTMLInputElement>(null!);

  const { id, releaseDate, title } = film;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Selected Film</h2>

      <label htmlFor="title">Title</label>
      <input name="title" defaultValue={title!} key={title!} ref={titleRef} />

      <label htmlFor="releaseDate">Release Date</label>
      <input
        name="releaseDate"
        defaultValue={releaseDate!}
        key={releaseDate!}
        ref={releaseDateRef}
      />

      <button
        onClick={() => {
          const update = {
            id,
            title: titleRef.current.value,
            releaseDate: releaseDateRef.current.value,
          };
          console.log("committing update with", update);
          commitUpdate(update);
        }}
      >
        Update!
      </button>
    </div>
  );
};

type Props = {
  filmRefs: FilmEditor_films$key;
};

const commitUpdate = ({
  id,
  title,
  releaseDate,
}: {
  id: string;
  title: string;
  releaseDate: string;
}) =>
  commitLocalUpdate(RelayEnvironment, (store) => {
    const filmRecord = store.get(id);

    if (!filmRecord) return;

    filmRecord.setValue(title, "title");
    filmRecord.setValue(releaseDate, "releaseDate");
  });

export default FilmEditor;
