defmodule Getthatjob.Recruitment.City do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Country, Job}

  schema "cities" do
    field :name, :string
    belongs_to :country, Country
    has_many :jobs, Job

    timestamps()
  end

  @doc false
  def changeset(city, attrs) do
    city
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
