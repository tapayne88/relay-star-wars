import React, { createContext, useState, useContext, FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { FilmListFilter_species$key } from "./__generated__/FilmListFilter_species.graphql";
import { sortByNameAsc } from "./sorting";

const FilterSpecieRead = createContext<string | null | undefined>(undefined);
const FilterSpecieWrite = createContext<((specie: string) => void) | undefined>(
  undefined
);

export const FilterSpecieProvider: FC = ({ children }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const setSpecie = (specie: string) => {
    console.log(specie);
    specie !== "" ? setSelected(specie) : setSelected(null);
  };

  return (
    <FilterSpecieRead.Provider value={selected}>
      <FilterSpecieWrite.Provider value={setSpecie}>
        {children}
      </FilterSpecieWrite.Provider>
    </FilterSpecieRead.Provider>
  );
};

export const useFilterSpecieRead = () => {
  const selected = useContext(FilterSpecieRead);
  if (selected === undefined) {
    throw new Error(
      "useFilterSpecieRead needs to be rendered in a tree with FilterSpecieProvider above"
    );
  }
  return selected;
};

const useFilterSpecieWrite = () => {
  const setSpecie = useContext(FilterSpecieWrite);
  if (setSpecie === undefined) {
    throw new Error(
      "useFilterSpecieWrite needs to be rendered in a tree with FilterSpecieProvider above"
    );
  }
  return setSpecie;
};

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
    <>
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
    </>
  );
};

type Props = {
  speciesRefs: FilmListFilter_species$key;
};

export default FilmListFilter;
