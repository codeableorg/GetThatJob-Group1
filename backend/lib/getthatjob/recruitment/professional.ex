defmodule Getthatjob.Recruitment.Professional do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Account.User
  alias Getthatjob.Recruitment.Application

  schema "professionals" do
    field :description, :string
    field :experience, :string
    field :github, :string
    field :linkedin, :string
    field :name, :string
    field :phone_number, :string
    has_one :user, User
    has_many :applications, Application

    timestamps()
  end

  @doc false
  def changeset(professional, attrs) do
    professional
    |> cast(attrs, [:name, :phone_number, :description, :experience, :linkedin, :github])
    |> validate_required([:name, :phone_number, :description, :experience])
  end
end
