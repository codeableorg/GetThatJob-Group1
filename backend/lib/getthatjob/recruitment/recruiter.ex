defmodule Getthatjob.Recruitment.Recruiter do
  use Ecto.Schema
  import Ecto.Changeset

  schema "recruiters" do
    field :company_description, :string
    field :company_logo_path, :string
    field :company_name, :string
    field :company_website, :string

    timestamps()
  end

  @doc false
  def changeset(recruiter, attrs) do
    recruiter
    |> cast(attrs, [:company_name, :company_logo_path, :company_website, :company_description])
    |> validate_required([:company_name, :company_logo_path, :company_website, :company_description])
  end
end
