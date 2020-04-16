## Requirements

- Clone the project: `git clone git@gitlab.entenso.com:E-Consul/e-consul-3.0.git`
- Install Node.js, Yarn, Make.

## How to run the project for develop?

1. `yarn`
2. `make dev-env`
3. `yarn start`

Server should be accessible by `http://localhost:3000/` by default.

## How to run the project for develop for back-end developers?

1. `make dev`

Server should be accessible by `http://localhost:4000/` by default.

## How to run the project for staging?

1. `make stage`

Server should be accessible by `http://mfa-stage.entenso.com` by default.

## How to run the project for test-staging?

1. `make test-stage`

Server should be accessible by `http://mfa-test.entenso.com` by default.

## Environments

1. `make test-env` - for testing internal company
2. `make stage-env` - for clients
3. `make dev-env` - for development for back-end developers

## Stage names [stage_name]

1. `stage` - for staging
2. `test-stage` - for testing staging

## For recreate container in production.

Faster solution:

1. `make [stage_name]`

Or (if have `docker-compose.yml` and `.env` files):

1. `make docker-build`
2. `make docker-down`
3. `make docker-up`
