# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :getthatjob,
       ecto_repos: [Getthatjob.Repo]

# Configures the endpoint
config :getthatjob,
       GetthatjobWeb.Endpoint,
       secret_key_base: "0ui+YfEKu4MS+3ijLT0E/KdYf4pXVo6gB0ymOx5pTNrjeR5vHh/JFoqWO7y46paB",
       render_errors: [
         view: GetthatjobWeb.ErrorView,
         accepts: ~w(json),
         layout: false
       ],
       pubsub_server: Getthatjob.PubSub,
       live_view: [
         signing_salt: "8ne/ubh3"
       ]

# Configures Elixir's Logger
config :logger,
       :console,
       format: "$time $metadata[$level] $message\n",
       metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
