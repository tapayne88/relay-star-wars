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
        director
      }
    `,
    filmRefs
  );
  const selected = useFilmSelectorRead();
  const titleRef = useRef<HTMLInputElement>(null!);
  const releaseDateRef = useRef<HTMLInputElement>(null!);
  const directorRef = useRef<HTMLInputElement>(null!);

  const film = films.find(({ id }) => id === selected)!;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Film Editor</h2>

      {!film ? (
        <>Please select a film</>
      ) : (
        <>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            defaultValue={film.title!}
            key={film.title!}
            ref={titleRef}
          />

          <label htmlFor="releaseDate">Release Date</label>
          <input
            name="releaseDate"
            defaultValue={film.releaseDate!}
            key={film.releaseDate!}
            ref={releaseDateRef}
          />

          <label htmlFor="releaseDate">Release Date</label>
          <input
            name="director"
            defaultValue={film.director!}
            key={film.director!}
            ref={directorRef}
          />

          <button
            onClick={() => {
              const update = {
                id: film.id,
                title: titleRef.current.value,
                releaseDate: releaseDateRef.current.value,
                director: directorRef.current.value,
              };
              commitUpdate(update);
            }}
          >
            Update
          </button>
        </>
      )}
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
  director,
}: {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
}) =>
  commitLocalUpdate(RelayEnvironment, (store) => {
    const filmRecord = store.get(id);

    if (!filmRecord) return;

    filmRecord.setValue(title, "title");
    filmRecord.setValue(releaseDate, "releaseDate");
    filmRecord.setValue(director, "director");
  });

export default FilmEditor;
