defmodule Getthatjob.Recruitment.JobType do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.Job

  schema "job_types" do
    field :name, :string
    has_many :jobs, Job

    timestamps()
  end

  @doc false
  def changeset(job_type, attrs) do
    job_type
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
