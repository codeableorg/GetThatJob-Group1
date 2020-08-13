defmodule Getthatjob.Recruitment.Job do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Recruiter, Application}

  schema "jobs" do
    field :expected, :string
    field :introduction, :string
    field :location, :string
    field :looking_for, :string
    field :requirements, :string
    field :salary, :integer
    field :seniority, :string
    field :title, :string
    field :type, :string
    belongs_to :recruiter, Recruiter
    has_many :applications, Application

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [
      :title,
      :type,
      :seniority,
      :salary,
      :location,
      :introduction,
      :expected,
      :looking_for,
      :requirements
    ])
    |> validate_required([
      :title,
      :type,
      :seniority,
      :location,
      :introduction,
      :expected,
      :looking_for,
      :requirements
    ])
  end
end
