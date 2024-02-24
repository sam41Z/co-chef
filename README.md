# CoChef

## Local setup
### Requirements
  * Elixir and Pheonix [installation guide](https://hexdocs.pm/phoenix/installation.html)
  * Docker Compose [installation guid](https://docs.docker.com/compose/install/)
  * Yarn [installation guide](https://yarnpkg.com/getting-started/install)
  
### Run local setup
  * Install dependencies with `mix deps.get`
  * Run postgreSQL with docker compose `docker-compose up -d`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `yarn install` inside the `assets` directory
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## TODO
### Features
 * Use hook instead fo context for ingredients
 * Bread recipe total configurable
 * Store recipe mode
 * Filter ingredients form in bread recipe mode
 * Recipe description
 * Recipe comments
 * Attach images to recipes
 * Account management

## Production
Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
