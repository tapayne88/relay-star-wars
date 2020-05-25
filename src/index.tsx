import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AllFilms, {
  App_AllFilmsQuery,
} from "./__generated__/App_AllFilmsQuery.graphql";
import * as serviceWorker from "./serviceWorker";
import { RelayEnvironmentProvider, preloadQuery } from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import FilmSelectorProvider from "./FilmSelector";
import FilterSpecieProvider from "./SpeciesFilter";
import FilmSortProvider from "./FilmSort";

const { Suspense } = React;

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <FilmSelectorProvider>
        <FilterSpecieProvider>
          <FilmSortProvider>
            <Suspense fallback={"Loading..."}>
              <App
                preloadedQuery={preloadQuery<App_AllFilmsQuery>(
                  RelayEnvironment,
                  AllFilms,
                  {}
                )}
              />
            </Suspense>
          </FilmSortProvider>
        </FilterSpecieProvider>
      </FilmSelectorProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
