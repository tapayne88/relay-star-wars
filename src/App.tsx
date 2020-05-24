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
import FilmListFilter from "./FilmListFilter";

const { Suspense } = React;

const App: FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery(AllFilms, preloadedQuery);
  console.log(data);

  const filmRefs = data.allFilms?.films?.filter(isNotNullable);

  if (!filmRefs || filmRefs.length < 1) {
    return <>No Films!</>;
  }

  const speciesRefs = filmRefs
    .map(({ speciesConnection }) => speciesConnection?.species)
    .flat()
    .filter(isNotNullable);

  const first = filmRefs[0];

  return (
    <>
      <h1>Star Wars GraphQL</h1>
      <FilmSelectorProvider initialValue={first.id}>
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
      </FilmSelectorProvider>
    </>
  );
};

type Props = {
  preloadedQuery: PreloadedQuery<App_AllFilmsQuery>;
};

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
