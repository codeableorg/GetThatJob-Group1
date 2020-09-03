import Config

config :getthatjob, Getthatjob.Repo,
  username: System.get_env("DATABASE_USER"),
  password: System.get_env("DATABASE_PASS"),
  database: System.get_env("DATABASE_NAME"),
  hostname: System.get_env("DATABASE_HOST"),
  port: System.get_env("DATABASE_PORT"),
  pool_size: 15

port = String.to_integer(System.get_env("PORT") || "4000")

config :getthatjob, Getthatjob.Endpoint,
  http: [
    port: port
    # transport_options: [socket_opts: [:inet6]]
  ],
  server: true,
  secret_key_base: System.get_env("SECRET_KEY_BASE")

config :getthatjob, auth_salt: System.get_env("AUTH_SALT")
