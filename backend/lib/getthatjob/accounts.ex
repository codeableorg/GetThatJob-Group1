defmodule Getthatjob.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Getthatjob.Repo

  alias Getthatjob.Accounts.User
  alias Getthatjob.Recruitment.{Professional, Recruiter}

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user(id) do
    Repo.get(User, id)
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(_type_user, attrs \\ %{})

  def create_user(%Professional{} = profesional, attrs) do
    %User{}
    |> User.changeset(Map.put(attrs, :type, "professional"))
    |> Ecto.Changeset.put_assoc(:professional, profesional)
    |> Repo.insert()
  end

  def create_user(%Recruiter{} = recruiter, attrs) do
    %User{}
    |> User.changeset(Map.put(attrs, :type, "recruiter"))
    |> Ecto.Changeset.put_assoc(:recruiter, recruiter)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  def authenticate(email, password) do
    user = Repo.get_by(User, email: email)

    with %{password_hash: password_hash} <- user,
         true <- Argon2.verify_pass(password, password_hash) do
      {:ok, user}
    else
      nil -> {:error, %{email: "email don't exist"}}
      false -> {:error, %{password: "wrong password"}}
    end
  end

  def fill_user_type(%User{} = user) do
    if user.professional_id == nil do
      Map.put(user, :type, "recruiter")
    else
      Map.put(user, :type, "professional")
    end
  end

  def get_professional_from_user(%User{} = user) do
    user
    |> Ecto.assoc(:professional)
    # |> join(:left, [p], u in assoc(p, :user))
    # |> preload([p, u], user: u)
    |> Repo.one()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end
