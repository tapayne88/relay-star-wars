import { RequestParameters, Variables } from "relay-runtime";
import { stringify } from "qs";
import persistedQueries from "./persisted-queries.json";

const GraphQlURL = "http://localhost:8081";

const getQuery = (
  operation: RequestParameters,
  variables: Record<string, unknown>
) =>
  fetch(`${GraphQlURL}?query=${operation.id}&${stringify(variables)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const postQuery = (
  operation: RequestParameters,
  variables: Record<string, unknown>
) =>
  fetch(GraphQlURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getQueryText(operation.id!),
      variables,
    }),
  });

const fetchGraphQL = async (
  operation: RequestParameters,
  variables: Variables
) => {
  const hashQueryResponse = await getQuery(operation, variables);

  if (!hashQueryResponse.ok) {
    const response = await postQuery(operation, variables);

    return await response.json();
  }

  // Get the response as JSON
  return await hashQueryResponse.json();
};

const getQueryText = (id: string): string =>
  (persistedQueries as Record<string, string>)[id];

export default fetchGraphQL;
