import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App, { preloadedQuery } from "./App";
import * as serviceWorker from "./serviceWorker";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import FilmSelectorProvider from "./FilmSelector";
import { FilterSpecieProvider } from "./FilmListFilter";

const { Suspense } = React;

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <FilmSelectorProvider>
        <FilterSpecieProvider>
          <Suspense fallback={"Loading..."}>
            <App preloadedQuery={preloadedQuery} />
          </Suspense>
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
