defmodule GetthatjobWeb.Auth.Token do
  @secret Application.get_env(:getthatjob, :auth_salt)

  def sign(user) do
    Phoenix.Token.sign(GetthatjobWeb.Endpoint, @secret, %{id: user.id})
  end

  def verify(token) do
    Phoenix.Token.verify(GetthatjobWeb.Endpoint, @secret, token, max_age: 365 * 24 * 3600)
  end
end
