defmodule Getthatjob.Recruitment.Application do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Job, Professional}

  schema "applications" do
    field :cv_path, :string
    field :professional_experience, :string
    field :reason, :string
    belongs_to :job, Job
    belongs_to :professional, Professional

    timestamps()
  end

  @doc false
  def changeset(application, attrs) do
    application
    |> cast(attrs, [:cv_path, :professional_experience, :reason])
    |> validate_required([:cv_path, :professional_experience, :reason])
  end
end
