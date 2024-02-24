# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :cochef,
  ecto_repos: [CoChef.Repo]

# Configures the endpoint
config :cochef, CoChefWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "updewuJKvTpcChgs3E98kDaBDfkXqPj+1vBdFw4alzg3/PmLEHYZVQN+IGzkhMlo",
  render_errors: [view: CoChefWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: CoChef.PubSub,
  live_view: [signing_salt: "j+Th8KwZ"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
