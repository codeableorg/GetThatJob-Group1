defmodule GetthatjobWeb.Resolvers.Account do
  alias Getthatjob.Recruitment

  alias GetthatjobWeb.Schema.ChangesetErrors

  def signup_professional(_, arg, _) do
    result =
      arg
      |> Enum.into(%{})
      |> Recruitment.create_professional()

    case result do
      {:ok, profesional} ->
        {:ok, %{user: profesional.user, token: "asd"}}

      {:error, changeset} ->
        IO.inspect(ChangesetErrors.error_details(changeset))

        {:error,
         message: "Could not create professional",
         details: ChangesetErrors.error_details(changeset)}
    end
  end
end
