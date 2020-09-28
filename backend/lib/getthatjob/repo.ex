defmodule Getthatjob.Repo do
  use Ecto.Repo,
      otp_app: :getthatjob,
      adapter: Ecto.Adapters.Postgres
end
