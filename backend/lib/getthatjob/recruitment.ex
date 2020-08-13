defmodule Getthatjob.Recruitment do
  @moduledoc """
  The Recruitment context.
  """

  import Ecto.Query, warn: false
  alias Getthatjob.Repo

  alias Getthatjob.Recruitment.Recruiter

  @doc """
  Returns the list of recruiters.

  ## Examples

      iex> list_recruiters()
      [%Recruiter{}, ...]

  """
  def list_recruiters do
    Repo.all(Recruiter)
  end

  @doc """
  Gets a single recruiter.

  Raises `Ecto.NoResultsError` if the Recruiter does not exist.

  ## Examples

      iex> get_recruiter!(123)
      %Recruiter{}

      iex> get_recruiter!(456)
      ** (Ecto.NoResultsError)

  """
  def get_recruiter!(id), do: Repo.get!(Recruiter, id)

  @doc """
  Creates a recruiter.

  ## Examples

      iex> create_recruiter(%{field: value})
      {:ok, %Recruiter{}}

      iex> create_recruiter(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_recruiter(attrs \\ %{}) do
    %Recruiter{}
    |> Recruiter.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a recruiter.

  ## Examples

      iex> update_recruiter(recruiter, %{field: new_value})
      {:ok, %Recruiter{}}

      iex> update_recruiter(recruiter, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_recruiter(%Recruiter{} = recruiter, attrs) do
    recruiter
    |> Recruiter.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a recruiter.

  ## Examples

      iex> delete_recruiter(recruiter)
      {:ok, %Recruiter{}}

      iex> delete_recruiter(recruiter)
      {:error, %Ecto.Changeset{}}

  """
  def delete_recruiter(%Recruiter{} = recruiter) do
    Repo.delete(recruiter)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking recruiter changes.

  ## Examples

      iex> change_recruiter(recruiter)
      %Ecto.Changeset{data: %Recruiter{}}

  """
  def change_recruiter(%Recruiter{} = recruiter, attrs \\ %{}) do
    Recruiter.changeset(recruiter, attrs)
  end

  alias Getthatjob.Recruitment.Professional

  @doc """
  Returns the list of professionals.

  ## Examples

      iex> list_professionals()
      [%Professional{}, ...]

  """
  def list_professionals do
    Repo.all(Professional)
  end

  @doc """
  Gets a single professional.

  Raises `Ecto.NoResultsError` if the Professional does not exist.

  ## Examples

      iex> get_professional!(123)
      %Professional{}

      iex> get_professional!(456)
      ** (Ecto.NoResultsError)

  """
  def get_professional!(id), do: Repo.get!(Professional, id)

  @doc """
  Creates a professional.

  ## Examples

      iex> create_professional(%{field: value})
      {:ok, %Professional{}}

      iex> create_professional(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_professional(attrs \\ %{}) do
    %Professional{}
    |> Professional.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a professional.

  ## Examples

      iex> update_professional(professional, %{field: new_value})
      {:ok, %Professional{}}

      iex> update_professional(professional, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_professional(%Professional{} = professional, attrs) do
    professional
    |> Professional.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a professional.

  ## Examples

      iex> delete_professional(professional)
      {:ok, %Professional{}}

      iex> delete_professional(professional)
      {:error, %Ecto.Changeset{}}

  """
  def delete_professional(%Professional{} = professional) do
    Repo.delete(professional)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking professional changes.

  ## Examples

      iex> change_professional(professional)
      %Ecto.Changeset{data: %Professional{}}

  """
  def change_professional(%Professional{} = professional, attrs \\ %{}) do
    Professional.changeset(professional, attrs)
  end

  alias Getthatjob.Recruitment.Job

  @doc """
  Returns the list of jobs.

  ## Examples

      iex> list_jobs()
      [%Job{}, ...]

  """
  def list_jobs do
    Repo.all(Job)
  end

  @doc """
  Gets a single job.

  Raises `Ecto.NoResultsError` if the Job does not exist.

  ## Examples

      iex> get_job!(123)
      %Job{}

      iex> get_job!(456)
      ** (Ecto.NoResultsError)

  """
  def get_job!(id), do: Repo.get!(Job, id)

  @doc """
  Creates a job.

  ## Examples

      iex> create_job(%{field: value})
      {:ok, %Job{}}

      iex> create_job(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_job(attrs \\ %{}) do
    %Job{}
    |> Job.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a job.

  ## Examples

      iex> update_job(job, %{field: new_value})
      {:ok, %Job{}}

      iex> update_job(job, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_job(%Job{} = job, attrs) do
    job
    |> Job.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a job.

  ## Examples

      iex> delete_job(job)
      {:ok, %Job{}}

      iex> delete_job(job)
      {:error, %Ecto.Changeset{}}

  """
  def delete_job(%Job{} = job) do
    Repo.delete(job)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking job changes.

  ## Examples

      iex> change_job(job)
      %Ecto.Changeset{data: %Job{}}

  """
  def change_job(%Job{} = job, attrs \\ %{}) do
    Job.changeset(job, attrs)
  end

  alias Getthatjob.Recruitment.Application

  @doc """
  Returns the list of applications.

  ## Examples

      iex> list_applications()
      [%Application{}, ...]

  """
  def list_applications do
    Repo.all(Application)
  end

  @doc """
  Gets a single application.

  Raises `Ecto.NoResultsError` if the Application does not exist.

  ## Examples

      iex> get_application!(123)
      %Application{}

      iex> get_application!(456)
      ** (Ecto.NoResultsError)

  """
  def get_application!(id), do: Repo.get!(Application, id)

  @doc """
  Creates a application.

  ## Examples

      iex> create_application(%{field: value})
      {:ok, %Application{}}

      iex> create_application(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_application(attrs \\ %{}) do
    %Application{}
    |> Application.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a application.

  ## Examples

      iex> update_application(application, %{field: new_value})
      {:ok, %Application{}}

      iex> update_application(application, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_application(%Application{} = application, attrs) do
    application
    |> Application.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a application.

  ## Examples

      iex> delete_application(application)
      {:ok, %Application{}}

      iex> delete_application(application)
      {:error, %Ecto.Changeset{}}

  """
  def delete_application(%Application{} = application) do
    Repo.delete(application)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking application changes.

  ## Examples

      iex> change_application(application)
      %Ecto.Changeset{data: %Application{}}

  """
  def change_application(%Application{} = application, attrs \\ %{}) do
    Application.changeset(application, attrs)
  end
end
