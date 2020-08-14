defmodule Getthatjob.Recruitment.Recruiter do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Account.User
  alias Getthatjob.Recruitment.Job

  schema "recruiters" do
    field :company_description, :string
    field :company_logo_path, :string
    field :company_name, :string
    field :company_website, :string
    has_one :user, User
    has_many :jobs, Job

    timestamps()
  end

  @doc false
  def changeset(recruiter, attrs) do
    recruiter
    |> cast(attrs, [:company_name, :company_logo_path, :company_website, :company_description])
    |> validate_required([
      :company_name,
      :company_logo_path,
      :company_website,
      :company_description
    ])
    |> cast_assoc(:user, with: &Getthatjob.Account.User.changeset/2)
  end
end
