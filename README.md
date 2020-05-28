# Star Wars API (SWAPI) via GraphQL with Relay

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Usual instructions apply.

## Getting Started

### Setup SWAPI

You need a local version of [SWAPI](https://github.com/graphql/swapi-graphql) running on port `8081` (the [live version](https://graphql.org/swapi-graphql/) doesn't have CORS headers).

As of writing there is a bug in SWAPI (see issue [#137](https://github.com/graphql/swapi-graphql/issues/137) and PR [#176](https://github.com/graphql/swapi-graphql/pull/176)). If the PR hasn't been merged use the repo / branch from PR (see instructions below).

```shell
# Clone fork of SWAPI
git clone git@github.com:tapayne88/swapi-graphql.git

# Checkout fixed branch
git checkout local-cache-entry-fix

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
