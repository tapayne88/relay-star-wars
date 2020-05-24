import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmListFilter_species$key } from "./__generated__/FilmListFilter_species.graphql";

const FilmListFilter: FC<Props> = ({ speciesRefs }) => {
  const species = useFragment(
    graphql`
      fragment FilmListFilter_species on Species @relay(plural: true) {
        id
        name
      }
    `,
    speciesRefs
  );
  return (
    <>
      <h4>Filter Films by specie</h4>
      <select>
        <option value="" selected>
          Choose filter specie
        </option>
        {species.map(({ name }) => (
          <option value={name!}>{name}</option>
        ))}
      </select>
    </>
  );
};

type Props = {
  speciesRefs: FilmListFilter_species$key;
};

export default FilmListFilter;
