defmodule GetthatjobWeb.Resolvers.Recruitment do
  alias Getthatjob.{Recruitment, Accounts}

  alias GetthatjobWeb.Schema.ChangesetErrors

  def job(_, %{id: id}, _) do
    case Recruitment.get_job(id) do
      nil ->
        {:error, message: "No job", details: %{}}

      job ->
        {:ok, job}
    end
  end

  def jobs(_, args, _) do
    {:ok, Recruitment.list_jobs(args)}
  end

  def applications_of_current_professional(_, _, %{context: %{current_user: user}}) do
    case Accounts.get_professional_from_user(user) do
      nil -> {:error, message: "Current user is not a recruiter", details: %{}}

      professional ->
        {:ok, Recruitment.list_application_of_professional(professional)}
    end
  end

  def jobs_of_current_recruiter(_, _, %{context: %{current_user: user}}) do
    case Accounts.get_recruiter_from_user(user) do
      nil ->
        {:error, message: "Current user is not a recruiter", details: %{}}

      recruiter ->
        {:ok, Recruitment.list_jobs_of_recruiter(recruiter)}
    end
  end

  def job_of_current_recruiter(_, %{id: id}, %{context: %{current_user: user}}) do
    case Accounts.get_recruiter_from_user(user) do
      nil ->
        {:ok, nil}

      recruiter ->
        {:ok, Recruitment.get_job_of_current_recruiter(id, recruiter)}
    end
  end

  def close_job_of_current_recruiter(_, %{id: id}, %{context: %{current_user: user}}) do
    with recruiter when not is_nil(recruiter) <- Accounts.get_recruiter_from_user(user),
         {:get_job_recruiter, job} when not is_nil(job) <-
           {:get_job_recruiter, Recruitment.get_job_of_current_recruiter(id, recruiter)},
         {:ok, job} <- Recruitment.close_job(job) do
      {:ok, job}
    else
      nil ->
        {:error,
         message: "Current user is not a recruiter",
         details: %{id: "Current user is not a recruiter"}}

      {:get_job_recruiter, nil} ->
        {:error,
         message: "Not avaliable job for current recruiter",
         details: %{id: "Not avaliable job for current recruiter"}}

      {:error, changeset} ->
        {:error,
         message: "Can not close the job", details: ChangesetErrors.error_details(changeset)}
    end
  end

  def create_job(_, args, %{context: %{current_user: user}}) do
    IO.inspect(args)

    with recruiter when not is_nil(recruiter) <- Accounts.get_recruiter_from_user(user),
         params <- Enum.into(args, %{}),
         {%{type_id: type_id, seniority_id: seniority_id, city_id: city_id}, params} <-
           Map.split(params, [:type_id, :seniority_id, :city_id]),
         {:ok, job_type} = get_job_type(type_id),
         {:ok, seniority} = get_seniority(seniority_id),
         {:ok, city} = get_city(city_id),
         {:ok, job} <-
           Recruitment.create_job(
             %{
               recruiter: recruiter,
               city: city,
               seniority: seniority,
               job_type: job_type
             },
             params
           ) do
      {:ok, job}
    else
      nil ->
        {:error, message: "Current user is not a recruiter", details: %{}}

      {:error_id, error_detail} ->
        {:error, message: "Choose a correct value", details: error_detail}

      {:error, changeset} ->
        {:error,
         message: "Could not create a job", details: ChangesetErrors.error_details(changeset)}
    end
  end

  def seniorities(_, _, _) do
    {:ok, Recruitment.list_seniorities()}
  end

  def job_types(_, _, _) do
    {:ok, Recruitment.list_job_types()}
  end

  def cities(_, _, _) do
    {:ok, Recruitment.list_cities()}
  end

  def countries(_, _, _) do
    {:ok, Recruitment.list_countries()}
  end

  defp get_job_type(id) do
    id
    |> Recruitment.get_job_type()
    |> get_assoc(%{job_type_id: "No avaliable job type"})
  end

  defp get_seniority(id) do
    id
    |> Recruitment.get_seniority()
    |> get_assoc(%{seniority_id: "No avaliable seniority"})
  end

  defp get_city(id) do
    id
    |> Recruitment.get_city()
    |> get_assoc(%{city_id: "No avaliable location"})
  end

  defp get_assoc(nil, detail_error) do
    {:error_assoc, detail_error}
  end

  defp get_assoc(assoc, _detail) do
    {:ok, assoc}
  end
end
