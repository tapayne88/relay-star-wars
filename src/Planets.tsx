import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";
import { Planets_filmPlanetsQuery } from "./__generated__/Planets_filmPlanetsQuery.graphql";
import { useFilmSelectorRead } from "./FilmSelector";
import { isNotNullable } from "./filtering";
import { sortByNameAsc } from "./sorting";

const Planets: FC = () => {
  const selected = useFilmSelectorRead()!;
  const data = useLazyLoadQuery<Planets_filmPlanetsQuery>(
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
    { filmId: selected }
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

export default Planets;
