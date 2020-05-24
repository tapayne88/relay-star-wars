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

const { Suspense } = React;

const App: FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery(AllFilms, preloadedQuery);
  console.log(data);

  const filmRefs = data.allFilms?.films?.filter(isNotNullable);

  if (!filmRefs || filmRefs.length < 1) {
    return <>No Films!</>;
  }

  const first = filmRefs[0];

  return (
    <>
      <h1>Star Wars GraphQL</h1>
      <FilmSelectorProvider initialValue={first.id}>
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
        <Accordion header="Film Details">
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

const isNotNullable = <T extends unknown>(
  value: T | null | undefined
): value is T => typeof value !== "undefined" && value !== null;

// Define a query
const AllFilms = graphql`
  query App_AllFilmsQuery {
    allFilms {
      films {
        id
        ...FilmEditor_films
        ...FilmList_films
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
