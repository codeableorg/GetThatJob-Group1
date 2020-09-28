use Mix.Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :getthatjob,
       Getthatjob.Repo,
       username: "postgres",
       password: "postgres",
       database: "getthatjob_test#{System.get_env("MIX_TEST_PARTITION")}",
       hostname: "localhost",
       pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :getthatjob,
       GetthatjobWeb.Endpoint,
       http: [
         port: 4002
       ],
       server: false

# Print only warnings and errors during test
config :logger, level: :warn

config :getthatjob, auth_salt: "xalkdXT0Nho04J/CHBueV6o0zmSiQDLf0E59dK/nowN+SiYd3sfq6RGuxIT/MJ9o"
