defmodule GetthatjobWeb.Auth.Token do
  def sign(user) do
    Phoenix.Token.sign(
      GetthatjobWeb.Endpoint,
      Application.get_env(:getthatjob, :auth_salt),
      %{
        id: user.id
      }
    )
  end

  def verify(token) do
    Phoenix.Token.verify(
      GetthatjobWeb.Endpoint,
      Application.get_env(:getthatjob, :auth_salt),
      token,
      max_age: 365 * 24 * 3600
    )
  end
end
