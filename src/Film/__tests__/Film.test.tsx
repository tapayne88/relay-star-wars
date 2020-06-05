import React from "react";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import ReactTestRenderer from "react-test-renderer";
import Film from "../Film";
import { Film_TestQuery } from "./__generated__/Film_TestQuery.graphql";

test("Fragment Container", () => {
  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <QueryRenderer<Film_TestQuery>
      environment={environment}
      query={graphql`
        query Film_TestQuery @relay_test_operation {
          film: node(id: "test-id") {
            ...Film_film
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return <Film film={props.film!} />;
        } else if (error) {
          return error.message;
        }
        return "Loading...";
      }}
    />
  );
  const renderer = ReactTestRenderer.create(<TestRenderer />);
  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  expect(renderer).toMatchSnapshot();
});
