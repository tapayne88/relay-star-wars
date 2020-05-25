import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { preloadQuery, usePreloadedQuery } from "react-relay/hooks";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import RelayEnvironment from "./RelayEnvironment";
import { App_AllFilmsQuery } from "./__generated__/App_AllFilmsQuery.graphql";
import FilmSelectorProvider from "./FilmSelector";
import FilmList from "./FilmList";
import FilmEditor from "./FilmEditor";
import FilmDetails from "./FilmDetails";
import Accordion from "./Accordion";
import { isNotNullable } from "./filtering";
import FilmListFilter, { FilterSpecieProvider } from "./FilmListFilter";
import { FragmentRefs } from "relay-runtime";

const { Suspense } = React;

const App: FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery(AllFilms, preloadedQuery);

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

  const first = filmRefs[0];

  return (
    <>
      <h1>Star Wars GraphQL</h1>
      <FilmSelectorProvider initialValue={first.id}>
        <FilterSpecieProvider>
          <FilmListFilter speciesRefs={speciesRefs} />
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
          <Accordion header={<h2>Film Details</h2>}>
            <Suspense fallback={"Loading..."}>
              <FilmDetails />
            </Suspense>
          </Accordion>
        </FilterSpecieProvider>
      </FilmSelectorProvider>
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

// Define a query
const AllFilms = graphql`
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
`;

export const preloadedQuery = preloadQuery<App_AllFilmsQuery>(
  RelayEnvironment,
  AllFilms,
  {}
);

export default App;
