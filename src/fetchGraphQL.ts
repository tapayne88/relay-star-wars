import { RequestParameters, Variables } from "relay-runtime";

const fetchGraphQL = async (
  text: RequestParameters["text"],
  variables: Variables
) => {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("http://localhost:8081", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
};

export default fetchGraphQL;
