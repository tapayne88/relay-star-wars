import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { preloadQuery, usePreloadedQuery } from "react-relay/hooks";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import RelayEnvironment from "./RelayEnvironment";
import { App_AllFilmsQuery } from "./__generated__/App_AllFilmsQuery.graphql";
import FilmList from "./FilmList";

const App: FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery(AllFilms, preloadedQuery);
  console.log(data);

  if (!data.allFilms?.films || data.allFilms.films.length < 1) {
    return <>No Films!</>;
  }

  const filmRefs = data.allFilms.films.filter(isNotNullable);

  return (
    <div>
      <h1>Star Wars GraphQL</h1>
      <FilmList filmRefs={filmRefs} />
    </div>
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
