import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import { Species_species$key } from "./__generated__/Species_species.graphql";

const Species: FC<Props> = ({ speciesRefs }) => {
  const species = useFragment(
    graphql`
      fragment Species_species on Species @relay(plural: true) {
        id
        name
      }
    `,
    speciesRefs
  );

  return (
    <>
      <h3>Species</h3>
      <ul>
        {species.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </>
  );
};

type Props = {
  speciesRefs: Species_species$key;
};

export default Species;
