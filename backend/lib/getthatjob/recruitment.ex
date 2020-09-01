defmodule Getthatjob.Recruitment do
  @moduledoc """
  The Recruitment context.
  """

  import Ecto.Query, warn: false
  alias Getthatjob.Repo

  alias Getthatjob.Recruitment.{
    Recruiter,
    Professional,
    City,
    Job,
    Application,
    Country,
    Seniority,
    JobType
  }

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
    |> Recruiter.update_changeset(attrs)
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
    |> Professional.update_changeset(attrs)
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

  @doc """
  Returns a list of places matching the given `criteria`.

  Example Criteria:

  [{:limit, 15}, {:order, :asc}, {:filter, [{:matching, "lake"}, {:wifi, true}, {:guest_count, 3}]}]
  """

  def list_jobs(criteria) do
    query = from(p in Job)

    Enum.reduce(criteria, query, fn
      {:limit, limit}, query ->
        from(p in query, limit: ^limit)

      {:filter, filters}, query ->
        filter_with(filters, query)

      {:order, order}, query ->
        from(p in query, order_by: [{^order, :id}])
    end)
    |> Repo.all()
  end

  def list_jobs_of_recruiter(%Recruiter{} = recruiter) do
    recruiter
    |> Ecto.assoc(:jobs)
    |> Repo.all()
  end

  defp filter_with(filters, query) do
    Enum.reduce(filters, query, fn
      {:matching, term}, query ->
        pattern = "%#{term}%"

        from(q in query,
          where:
            ilike(q.title, ^pattern) or
              ilike(q.introduction, ^pattern) or
              ilike(q.requirements, ^pattern)
        )

      {:country, value}, query ->
        from(q in query,
          join: ci in City,
          on: q.city_id == ci.id,
          join: co in Country,
          on: ci.country_id == co.id,
          where: co.name == ^value
        )

      {:job_type, value}, query ->
        from(q in query,
          join: jt in JobType,
          on: jt.id == q.job_type_id,
          where: jt.name == ^value
        )

      {:seniority, value}, query ->
        from(
          q in query,
          join: s in Seniority,
          on: s.id == q.seniority_id,
          where: s.name == ^value
        )

      {:salary_range, %{low: low_salary, high: high_salary}}, query ->
        salary_between(query, low_salary, high_salary)

      {:closed, value}, query ->
        from(q in query,
          where: q.closed == ^value
        )
    end)
  end

  defp salary_between(query, low_salary, high_salary) do
    from(q in query,
      where:
        fragment(
          "? BETWEEN ? AND ?",
          q.salary,
          ^low_salary,
          ^high_salary
        )
    )
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
  def get_job(id), do: Repo.get(Job, id)

  @doc false
  def get_job_by_title!(title), do: Repo.get_by!(Job, title: title)

  @doc """
  Creates a job.

  ## Examples

      iex> create_job(%{field: value})
      {:ok, %Job{}}

      iex> create_job(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_job(
        %{
          recruiter: %Recruiter{} = recruiter,
          city: %City{} = city,
          seniority: %Seniority{} = seniority,
          job_type: %JobType{} = job_type
        },
        attrs \\ %{}
      ) do
    %Job{}
    |> Job.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:recruiter, recruiter)
    |> Ecto.Changeset.put_assoc(:city, city)
    |> Ecto.Changeset.put_assoc(:seniority, seniority)
    |> Ecto.Changeset.put_assoc(:job_type, job_type)
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
  def create_application(%Job{} = job, %Professional{} = professional, attrs \\ %{}) do
    %Application{}
    |> Application.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:job, job)
    |> Ecto.Changeset.put_assoc(:professional, professional)
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

  # Dataloader

  def datasource() do
    Dataloader.Ecto.new(Repo, query: &query/2)
  end

  def query(queryable, _) do
    queryable
  end

  @doc """
  Returns the list of countries.

  ## Examples

      iex> list_countries()
      [%Country{}, ...]

  """
  def list_countries do
    Repo.all(Country)
  end

  @doc """
  Gets a single country.

  Raises `Ecto.NoResultsError` if the Country does not exist.

  ## Examples

      iex> get_country!(123)
      %Country{}

      iex> get_country!(456)
      ** (Ecto.NoResultsError)

  """
  def get_country!(id), do: Repo.get!(Country, id)

  @doc """
  Creates a country.

  ## Examples

      iex> create_country(%{field: value})
      {:ok, %Country{}}

      iex> create_country(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_country(attrs \\ %{}) do
    %Country{}
    |> Country.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a country.

  ## Examples

      iex> delete_country(country)
      {:ok, %Country{}}

      iex> delete_country(country)
      {:error, %Ecto.Changeset{}}

  """
  def delete_country(%Country{} = country) do
    Repo.delete(country)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking country changes.

  ## Examples

      iex> change_country(country)
      %Ecto.Changeset{data: %Country{}}

  """
  def change_country(%Country{} = country, attrs \\ %{}) do
    Country.changeset(country, attrs)
  end

  @doc """
  Returns the list of cities.

  ## Examples

      iex> list_cities()
      [%City{}, ...]

  """
  def list_cities do
    Repo.all(City)
  end

  @doc """
  Gets a single city.

  Raises `Ecto.NoResultsError` if the City does not exist.

  ## Examples

      iex> get_city!(123)
      %City{}

      iex> get_city!(456)
      ** (Ecto.NoResultsError)

  """
  def get_city!(id), do: Repo.get!(City, id)
  def get_city(id), do: Repo.get(City, id)

  @doc """
  Creates a city.

  ## Examples

      iex> create_city(%{field: value})
      {:ok, %City{}}

      iex> create_city(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_city(%Country{} = country, attrs \\ %{}) do
    %City{}
    |> City.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:country, country)
    |> Repo.insert()
  end

  @doc """
  Updates a city.

  ## Examples

      iex> update_city(city, %{field: new_value})
      {:ok, %City{}}

      iex> update_city(city, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_city(%City{} = city, attrs) do
    city
    |> City.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a city.

  ## Examples

      iex> delete_city(city)
      {:ok, %City{}}

      iex> delete_city(city)
      {:error, %Ecto.Changeset{}}

  """
  def delete_city(%City{} = city) do
    Repo.delete(city)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking city changes.

  ## Examples

      iex> change_city(city)
      %Ecto.Changeset{data: %City{}}

  """
  def change_city(%City{} = city, attrs \\ %{}) do
    City.changeset(city, attrs)
  end

  @doc """
  Returns the list of seniorities.

  ## Examples

      iex> list_seniorities()
      [%Seniority{}, ...]

  """
  def list_seniorities do
    Repo.all(Seniority)
  end

  @doc """
  Gets a single seniority.

  Raises `Ecto.NoResultsError` if the Seniority does not exist.

  ## Examples

      iex> get_seniority!(123)
      %Seniority{}

      iex> get_seniority!(456)
      ** (Ecto.NoResultsError)

  """
  def get_seniority!(id), do: Repo.get!(Seniority, id)
  def get_seniority(id), do: Repo.get(Seniority, id)

  @doc """
  Creates a seniority.

  ## Examples

      iex> create_seniority(%{field: value})
      {:ok, %Seniority{}}

      iex> create_seniority(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_seniority(attrs \\ %{}) do
    %Seniority{}
    |> Seniority.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a seniority.

  ## Examples

      iex> update_seniority(seniority, %{field: new_value})
      {:ok, %Seniority{}}

      iex> update_seniority(seniority, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_seniority(%Seniority{} = seniority, attrs) do
    seniority
    |> Seniority.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a seniority.

  ## Examples

      iex> delete_seniority(seniority)
      {:ok, %Seniority{}}

      iex> delete_seniority(seniority)
      {:error, %Ecto.Changeset{}}

  """
  def delete_seniority(%Seniority{} = seniority) do
    Repo.delete(seniority)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking seniority changes.

  ## Examples

      iex> change_seniority(seniority)
      %Ecto.Changeset{data: %Seniority{}}

  """
  def change_seniority(%Seniority{} = seniority, attrs \\ %{}) do
    Seniority.changeset(seniority, attrs)
  end

  @doc """
  Returns the list of job_types.

  ## Examples

      iex> list_job_types()
      [%JobType{}, ...]

  """
  def list_job_types do
    Repo.all(JobType)
  end

  @doc """
  Gets a single job_type.

  Raises `Ecto.NoResultsError` if the Job type does not exist.

  ## Examples

      iex> _type!(123)
      %JobType{}get_job

      iex> get_job_type!(456)
      ** (Ecto.NoResultsError)

  """
  def get_job_type!(id), do: Repo.get!(JobType, id)
  def get_job_type(id), do: Repo.get(JobType, id)

  @doc """
  Creates a job_type.

  ## Examples

      iex> create_job_type(%{field: value})
      {:ok, %JobType{}}

      iex> create_job_type(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_job_type(attrs \\ %{}) do
    %JobType{}
    |> JobType.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a job_type.

  ## Examples

      iex> update_job_type(job_type, %{field: new_value})
      {:ok, %JobType{}}

      iex> update_job_type(job_type, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_job_type(%JobType{} = job_type, attrs) do
    job_type
    |> JobType.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a job_type.

  ## Examples

      iex> delete_job_type(job_type)
      {:ok, %JobType{}}

      iex> delete_job_type(job_type)
      {:error, %Ecto.Changeset{}}

  """
  def delete_job_type(%JobType{} = job_type) do
    Repo.delete(job_type)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking job_type changes.

  ## Examples

      iex> change_job_type(job_type)
      %Ecto.Changeset{data: %JobType{}}

  """
  def change_job_type(%JobType{} = job_type, attrs \\ %{}) do
    JobType.changeset(job_type, attrs)
  end
end
