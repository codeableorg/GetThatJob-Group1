defmodule GetthatjobWeb.Plugs.SetCurrentUser do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, %{id: id}} <- GetthatjobWeb.Auth.Token.verify(token),
         %{} = user <- Getthatjob.Accounts.get_user(id),
         user <- Getthatjob.Accounts.fill_user_type(user) do
      %{current_user: user}
    else
      _ -> %{}
    end
  end
end
