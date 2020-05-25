import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { usePreloadedQuery } from "react-relay/hooks";
import { FragmentRefs } from "relay-runtime";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { App_AllFilmsQuery } from "./__generated__/App_AllFilmsQuery.graphql";
import { useFilmSelectorRead } from "./FilmSelector";
import { isNotNullable } from "./filtering";
import FilmList from "./FilmList";
import FilmEditor from "./FilmEditor";
import FilmListFilter from "./FilmListFilter";
import FilmListSort from "./FilmListSort";

const FilmDetails = React.lazy(() => import("./FilmDetails"));

const { Suspense } = React;

const App: FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery(
    graphql`
      query App_AllFilmsQuery {
        allFilms {
          films {
            id
            ...FilmEditor_films
            ...FilmList_films
            speciesConnection {
              species {
                id
                ...FilmListFilter_species
              }
            }
          }
        }
      }
    `,
    preloadedQuery
  );
  const selectedFilm = useFilmSelectorRead();

  const filmRefs = data.allFilms?.films?.filter(isNotNullable);

  if (!filmRefs || filmRefs.length < 1) {
    return <>No Films!</>;
  }

  const speciesRefs = filmRefs.reduce((collection, { speciesConnection }) => {
    const uniqueSpecies: SpeciesRef =
      speciesConnection?.species?.filter((specie): specie is SpecieRef =>
        specie && !collection.find((s) => s.id === specie.id) ? true : false
      ) || [];
    return [...collection, ...uniqueSpecies];
  }, [] as SpeciesRef);

  return (
    <>
      <h1>Star Wars GraphQL</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FilmListFilter speciesRefs={speciesRefs} />
        <FilmListSort />
      </div>
      <div
        style={{
          margin: "0 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FilmList filmRefs={filmRefs} />
        <FilmEditor filmRefs={filmRefs} />
      </div>
      {selectedFilm && (
        <>
          <h2>Film Details</h2>
          <Suspense fallback={"Loading..."}>
            <FilmDetails />
          </Suspense>
        </>
      )}
    </>
  );
};

type Props = {
  preloadedQuery: PreloadedQuery<App_AllFilmsQuery>;
};

type SpecieRef = {
  id: string;
  " $fragmentRefs": FragmentRefs<"FilmListFilter_species">;
};
type SpeciesRef = ReadonlyArray<SpecieRef>;

export default App;
