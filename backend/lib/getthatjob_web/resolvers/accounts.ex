defmodule GetthatjobWeb.Resolvers.Accounts do
  alias Getthatjob.{Recruitment, Accounts}

  alias GetthatjobWeb.Schema.ChangesetErrors

  def me(_, _, %{context: %{current_user: user}}) do
    {:ok, user}
  end

  def me(_, _, _) do
    {:ok, nil}
  end

  def sign_in(_, %{email: email, password: password}, _) do
    case Accounts.authenticate(email, password) do
      {:error, details} ->
        {:error, message: "Whoops, invalid credentials!", details: details}

      {:ok, user} ->
        user = user |> Accounts.fill_user_type()
        token = GetthatjobWeb.Auth.Token.sign(user)
        {:ok, %{user: user, token: token}}
    end
  end

  def sign_up_professional(_, args, _) do
    result =
      args
      |> Enum.into(%{})
      |> Recruitment.create_professional()

    case result do
      {:ok, profesional} ->
        user = profesional.user |> Accounts.fill_user_type()
        token = GetthatjobWeb.Auth.Token.sign(user)
        {:ok, %{user: user, token: token}}

      {:error, changeset} ->
        {:error,
         message: "Could not create professional",
         details: ChangesetErrors.error_details(changeset)}
    end
  end

  def sign_up_recruiter(_, args, _) do
    result =
      args
      |> Enum.into(%{})
      |> Recruitment.create_recruiter()

    case result do
      {:ok, recruiter} ->
        user = recruiter.user |> Accounts.fill_user_type()
        token = GetthatjobWeb.Auth.Token.sign(user)
        {:ok, %{user: user, token: token}}

      {:error, changeset} ->
        {:error,
         message: "Could not create recruiter", details: ChangesetErrors.error_details(changeset)}
    end
  end

  def update_current_professional(_, args, %{context: %{current_user: user}}) do
    with professional <- Accounts.get_professional_from_user(user),
         params <- Enum.into(args, %{}),
         {:ok, professional} <- Recruitment.update_professional(professional, params) do
      {:ok, professional}
    else
      nil ->
        {:error, message: "Current user is not a professional", details: %{amiguito: "amiguito"}}

      {:error, changeset} ->
        {:error,
         message: "Could not update professional",
         details: ChangesetErrors.error_details(changeset)}
    end
  end

  def update_current_recruiter(_, args, %{context: %{current_user: user}}) do
    with recruiter <- Accounts.get_recruiter_from_user(user),
         params <- Enum.into(args, %{}),
         {:ok, recruiter} <- Recruitment.update_recruiter(recruiter, params) do
      {:ok, recruiter}
    else
      nil ->
        {:error, message: "Current user is not a recruiter", details: %{amiguito: "amiguito"}}

      {:error, changeset} ->
        {:error,
         message: "Could not update recruiter", details: ChangesetErrors.error_details(changeset)}
    end
  end
end
