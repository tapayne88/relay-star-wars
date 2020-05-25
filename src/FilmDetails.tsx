import React, { FC } from "react";
import graphql from "babel-plugin-relay/macro";
import {
  useRelayEnvironment,
  preloadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import { FilmDetails_filmQuery } from "./__generated__/FilmDetails_filmQuery.graphql";
import { useFilmSelectorRead } from "./FilmSelector";
import Species from "./Species";
import { isNotNullable } from "./filtering";
import FilmDetailsReleaseDate from "./FilmDetailsReleaseDate";
import Accordion from "./Accordion";
import preloadPlanets, {
  Planets_filmPlanetsQuery,
} from "./__generated__/Planets_filmPlanetsQuery.graphql";
import { PreloadedQuery } from "react-relay/lib/relay-experimental/EntryPointTypes";

const Planets = React.lazy(() => import("./Planets"));

const { Suspense } = React;

const FilmDetails: FC<Props> = ({ preloadedQuery }) => {
  const selected = useFilmSelectorRead()!;
  const environment = useRelayEnvironment();

  const data = usePreloadedQuery(
    graphql`
      query FilmDetails_filmQuery($filmId: ID!) {
        film(id: $filmId) {
          ...FilmDetailsReleaseDate_film
          title
          episodeID
          director
          speciesConnection {
            species {
              ...Species_species
            }
          }
        }
      }
    `,
    preloadedQuery
  );

  const film = data?.film;

  if (!film) {
    return <>:shrug:</>;
  }

  const { title, episodeID, director, speciesConnection } = film;

  const species = speciesConnection?.species?.filter(isNotNullable);

  return (
    <dl>
      <dt>Title</dt>
      <dd>{title}</dd>

      <dt>Episode ID</dt>
      <dd>{episodeID}</dd>

      <dt>Director</dt>
      <dd>{director}</dd>

      <FilmDetailsReleaseDate filmRef={film} />

      {species && <Species speciesRefs={species} />}

      <Accordion<Planets_filmPlanetsQuery>
        prepare={() =>
          preloadQuery(environment, preloadPlanets, { filmId: selected })
        }
        header={<h3>Planets</h3>}
      >
        {(preloadedQuery) => (
          <>
            <Suspense fallback={"Loading..."}>
              <Planets preloadedQuery={preloadedQuery} />
            </Suspense>
          </>
        )}
      </Accordion>
    </dl>
  );
};

type Props = {
  preloadedQuery: PreloadedQuery<FilmDetails_filmQuery>;
};

export default FilmDetails;
