defmodule GetthatjobWeb.Resolvers.Recruitment do
  alias Getthatjob.{Recruitment, Accounts}

  alias GetthatjobWeb.Schema.ChangesetErrors

  def job(_, %{id: id}, _) do
    {:ok, Recruitment.get_job!(id)}
  end

  def jobs(_, args, _) do
    {:ok, Recruitment.list_jobs(args)}
  end

  def create_job(_, args, %{context: %{current_user: user}}) do
    with recruiter <- Accounts.get_recruiter_from_user(user),
         params <- Enum.into(args, %{}),
         {:ok, job} <- Recruitment.create_job(recruiter, params) do
      {:ok, job}
    else
      nil ->
        {:error, message: "Current user is not a recruiter", details: %{}}

      {:error, changeset} ->
        {:error,
         message: "Could not create a job", details: ChangesetErrors.error_details(changeset)}
    end
  end
end
