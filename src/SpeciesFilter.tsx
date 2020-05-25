import React, { createContext, useState, useContext, FC } from "react";

const FilterSpecieRead = createContext<string | null | undefined>(undefined);
const FilterSpecieWrite = createContext<((specie: string) => void) | undefined>(
  undefined
);

const FilterSpecieProvider: FC = ({ children }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const setSpecie = (specie: string) => {
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

export const useFilterSpecieWrite = () => {
  const setSpecie = useContext(FilterSpecieWrite);
  if (setSpecie === undefined) {
    throw new Error(
      "useFilterSpecieWrite needs to be rendered in a tree with FilterSpecieProvider above"
    );
  }
  return setSpecie;
};

export default FilterSpecieProvider;
