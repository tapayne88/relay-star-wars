import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmListFilter_species$key } from "./__generated__/FilmListFilter_species.graphql";
import { sortByNameAsc } from "./sorting";
import { useFilterSpecieWrite } from "./SpeciesFilter";

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
  const setSpecie = useFilterSpecieWrite();

  return (
    <div>
      <h4>Filter Films by specie</h4>
      <select
        defaultValue=""
        onChange={(event) => setSpecie(event.target.value)}
      >
        <option value="">Choose filter specie</option>
        {sortByNameAsc(species).map(({ name }) => (
          <option key={name!} value={name!}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

type Props = {
  speciesRefs: FilmListFilter_species$key;
};

export default FilmListFilter;
