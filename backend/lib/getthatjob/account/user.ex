defmodule Getthatjob.Account.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Professional, Recruiter}

  schema "users" do
    field(:email, :string)
    field(:password_hash, :string)
    field(:password, :string, virtual: true)
    belongs_to :professional, Professional
    belongs_to :recruiter, Recruiter

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
    |> check_constraint(:professional, name: :one_type_user)
    |> hash_password()
  end

  @doc false
  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        change(changeset, Argon2.add_hash(password))

      _ ->
        changeset
    end
  end
end
