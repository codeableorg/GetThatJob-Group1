defmodule Getthatjob.Recruitment.Job do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Recruiter, Application, City, Seniority, JobType}

  schema "jobs" do
    field :expected, :string
    field :introduction, :string
    field :looking_for, :string
    field :requirements, :string
    field :salary, :integer
    field :title, :string
    belongs_to :recruiter, Recruiter
    has_many :applications, Application
    belongs_to :city, City
    belongs_to :seniority, Seniority
    belongs_to :job_type, JobType

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
      :requirements
    ])
    |> validate_required([
      :title,
      :introduction,
      :expected,
      :looking_for,
      :requirements
    ])
  end
end
