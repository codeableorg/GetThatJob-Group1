defmodule GetthatjobWeb.Resolvers.Accounts do
  alias Getthatjob.{Recruitment, Accounts}

  alias GetthatjobWeb.Schema.ChangesetErrors

  def signin(_, %{email: email, password: password}, _) do
    case Accounts.authenticate(email, password) do
      :error ->
        {:error, "Whoops, invalid credentials!"}

      {:ok, user} ->
        token = GetthatjobWeb.Auth.Token.sign(user)
        {:ok, %{user: user, token: token}}
    end
  end

  def signup_professional(_, arg, _) do
    result =
      arg
      |> Enum.into(%{})
      |> Recruitment.create_professional()

    case result do
      {:ok, profesional} ->
        token = GetthatjobWeb.Auth.Token.sign(profesional.user)
        {:ok, %{user: profesional.user, token: token}}

      {:error, changeset} ->
        {:error,
         message: "Could not create professional",
         details: ChangesetErrors.error_details(changeset)}
    end
  end

  def signup_recruiter(_, arg, _) do
    result =
      arg
      |> Enum.into(%{})
      |> Recruitment.create_recruiter()

    case result do
      {:ok, recruiter} ->
        token = GetthatjobWeb.Auth.Token.sign(recruiter.user)
        {:ok, %{user: recruiter.user, token: token}}

      {:error, changeset} ->
        {:error,
         message: "Could not create recruiter", details: ChangesetErrors.error_details(changeset)}
    end
  end
end
