defmodule Getthatjob.Recruitment.Professional do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Accounts.User
  alias Getthatjob.Recruitment.Application

  schema "professionals" do
    field(:description, :string)
    field(:experience, :string)
    field(:github, :string)
    field(:linkedin, :string)
    field(:name, :string)
    field(:phone_number, :string)
    has_one(:user, User)
    has_many(:applications, Application)

    timestamps()
  end

  @doc false
  def changeset(professional, attrs) do
    professional
    |> cast(attrs, [:name, :phone_number, :description, :experience, :linkedin, :github])
    |> cast_assoc(:user, with: &Getthatjob.Accounts.User.changeset/2)
  end

  @doc false
  def update_changeset(professional, attrs) do
    professional
    |> cast(attrs, [:name, :phone_number, :description, :experience, :linkedin, :github])
    |> validate_required([:name, :phone_number, :description, :experience])
  end
end
