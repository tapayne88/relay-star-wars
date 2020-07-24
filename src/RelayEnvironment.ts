import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  QueryResponseCache,
} from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

const FIVE_MINUTE = 1000 * 60 * 5;
const cache = new QueryResponseCache({ size: 250, ttl: FIVE_MINUTE });

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
const fetchRelay: FetchFunction = async (operation, variables) => {
  const queryID = operation.name;
  const cachedData = cache.get(queryID, variables);

  if (cachedData !== null) return cachedData;

  console.log(
    `fetching query ${operation.name} with ${JSON.stringify(variables)}`
  );

  return fetchGraphQL(operation, variables).then((data) => {
    if (operation.operationKind !== "mutation") {
      cache.set(queryID, variables, data);
    }

    return data;
  });
};

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
