defmodule Getthatjob.Recruitment.Seniority do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.Job

  schema "seniorities" do
    field :name, :string
    has_many :jobs, Job

    timestamps()
  end

  @doc false
  def changeset(seniority, attrs) do
    seniority
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
