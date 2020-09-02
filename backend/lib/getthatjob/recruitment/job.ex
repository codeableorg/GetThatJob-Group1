defmodule Getthatjob.Recruitment.Job do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Recruiter, Application, City, Seniority, JobType}

  schema "jobs" do
    field(:expected, :string)
    field(:introduction, :string)
    field(:looking_for, :string)
    field(:requirements, :string)
    field(:salary, :integer)
    field(:title, :string)
    field(:closed, :boolean)
    belongs_to(:recruiter, Recruiter)
    has_many(:applications, Application)
    belongs_to(:city, City)
    belongs_to(:seniority, Seniority)
    belongs_to(:job_type, JobType)

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [
      :title,
      :salary,
      :introduction,
      :expected,
      :looking_for,
      :requirements,
      :closed
    ])
    |> validate_required([
      :title,
      :introduction,
      :expected,
      :looking_for,
      :requirements
    ])
  end

  def close_changeset(job) do
    job
    |> change()
    |> close_job()
  end

  def close_job(%Ecto.Changeset{data: %__MODULE__{closed: false}} = changeset) do
    changeset |> put_change(:closed, true)
  end

  def close_job(%Ecto.Changeset{data: %__MODULE__{closed: true}} = changeset) do
    changeset |> add_error(:closed, "already closed")
  end
end
