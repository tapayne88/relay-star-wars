import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";
import {
  Vehicles_filmVehiclesQuery,
  Vehicles_filmVehiclesQueryVariables,
} from "./__generated__/Vehicles_filmVehiclesQuery.graphql";
import { isNotNullable } from "./filtering";
import { sortByNameAsc } from "./sorting";

const Vehicles: FC<Props> = ({ filmId }) => {
  const data = useLazyLoadQuery<Vehicles_filmVehiclesQuery>(
    graphql`
      query Vehicles_filmVehiclesQuery($filmId: ID!) {
        film(id: $filmId) {
          vehicleConnection {
            vehicles {
              name
            }
          }
        }
      }
    `,
    { filmId }
  );

  const vehicles = data?.film?.vehicleConnection?.vehicles?.filter(
    isNotNullable
  );

  if (!vehicles || vehicles.length < 1) {
    return <>:shrug:</>;
  }

  return (
    <ul>
      {sortByNameAsc(vehicles).map(({ name }) => (
        <li key={name!}>{name}</li>
      ))}
    </ul>
  );
};

type Props = Vehicles_filmVehiclesQueryVariables;

export default Vehicles;
