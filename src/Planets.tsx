import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { usePreloadedQuery } from "react-relay/hooks";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";
import { Planets_filmPlanetsQuery } from "./__generated__/Planets_filmPlanetsQuery.graphql";
import { isNotNullable } from "./filtering";
import { sortByNameAsc } from "./sorting";

const Planets: FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery(
    graphql`
      query Planets_filmPlanetsQuery($filmId: ID!) {
        film(id: $filmId) {
          planetConnection {
            planets {
              name
            }
          }
        }
      }
    `,
    preloadedQuery
  );

  const planets = data?.film?.planetConnection?.planets?.filter(isNotNullable);

  if (!planets || planets.length < 1) {
    return <>:shrug:</>;
  }

  return (
    <ul>
      {sortByNameAsc(planets).map(({ name }) => (
        <li key={name!}>{name}</li>
      ))}
    </ul>
  );
};

type Props = {
  preloadedQuery: PreloadedQuery<Planets_filmPlanetsQuery>;
};

export default Planets;
