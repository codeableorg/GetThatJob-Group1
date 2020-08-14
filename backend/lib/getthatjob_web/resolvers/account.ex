defmodule GetthatjobWeb.Resolvers.Account do
  alias Getthatjob.Recruitment

  def signup_professional(_, arg, _) do
    arg
    |> Enum.into(%{})
    |> Recruitment.create_professional()
  end
end
