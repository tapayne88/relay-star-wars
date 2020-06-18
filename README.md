# Star Wars API (SWAPI) via GraphQL with Relay

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Usual instructions apply.

## Getting Started

### Setup SWAPI

You need a local version of [SWAPI](https://github.com/graphql/swapi-graphql) running on port `8081` (the [live version](https://graphql.org/swapi-graphql/) doesn't have CORS headers).

```shell
# Clone SWAPI
git clone git@github.com:graphql/swapi-graphql.git

# Install dependencies, this will also try run build-lambda and will likely fail - don't worry
yarn install

# Start server on port 8081
PORT=8081 yarn start
```

### Setup App

```shell
# Install dependencies
yarn install

# Fetch GraphQL schema from deployed SWAPI
yarn relay:fetch_schema

# Generate relay query / fragment files
yarn relay

# Start create-react-app
yarn start
```
