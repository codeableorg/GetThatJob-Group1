defmodule Getthatjob.Recruitment.Job do
  use Ecto.Schema
  import Ecto.Changeset

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
    field :recruiter_id, :id

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:title, :type, :seniority, :salary, :location, :introduction, :expected, :looking_for, :requirements])
    |> validate_required([:title, :type, :seniority, :salary, :location, :introduction, :expected, :looking_for, :requirements])
  end
end
