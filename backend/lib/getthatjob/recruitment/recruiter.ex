defmodule Getthatjob.Recruitment.Recruiter do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Accounts.User
  alias Getthatjob.Recruitment.Job

  schema "recruiters" do
    field(:company_description, :string)
    field(:company_logo_path, :string)
    field(:company_logo_meta, :map, virtual: true)
    field(:company_name, :string)
    field(:company_website, :string)
    has_one(:user, User)
    has_many(:jobs, Job)

    timestamps()
  end

  @doc false
  def changeset(recruiter, attrs) do
    recruiter
    |> cast(attrs, [:company_name, :company_logo_meta, :company_website, :company_description])
    |> validate_required([
      :company_name,
      :company_logo_meta,
      :company_website,
      :company_description
    ])
    |> cast_assoc(:user, with: &Getthatjob.Accounts.User.changeset/2)
    |> process_company_logo()
  end

  @doc false
  def update_changeset(recruiter, attrs) do
    recruiter
    |> cast(attrs, [:company_name, :company_logo_meta, :company_website, :company_description])
    |> validate_required([
      :company_name,
      :company_website,
      :company_description
    ])
    |> process_company_logo()
  end

  @doc false
  defp process_company_logo(
         %Ecto.Changeset{
           valid?: true,
           changes: %{company_logo_meta: %{path: path, filename: filename}},
           data: %__MODULE__{company_logo_path: nil}
         } = changeset
       ) do
    with new_filename <- Ecto.UUID.generate(),
         extension <- Path.extname(filename),
         new_path <- Path.absname("./priv/uploads/" <> new_filename <> extension),
         {:ok, _} <- File.copy(path, new_path) do
      put_change(changeset, :company_logo_path, new_filename <> extension)
    else
      _ ->
        changeset |> add_error(:company_logo_meta, "could not upload file")
    end
  end

  defp process_company_logo(
         %Ecto.Changeset{
           valid?: true,
           changes: %{company_logo_meta: %{path: path, filename: filename}},
           data: %__MODULE__{company_logo_path: company_logo_path}
         } = changeset
       ) do
    with new_filename <- Ecto.UUID.generate(),
         extension <- Path.extname(filename),
         new_path <- Path.absname("./priv/uploads/" <> new_filename <> extension),
         :ok <- Path.absname("./priv/uploads/" <> company_logo_path) |> File.rm(),
         {:ok, _} <- File.copy(path, new_path) do
      IO.puts("delete last image")
      put_change(changeset, :company_logo_path, new_filename <> extension)
    else
      _ ->
        changeset |> add_error(:company_logo_meta, "could not upload file")
    end
  end

  @doc false
  defp process_company_logo(changeset) do
    IO.inspect(changeset)
    changeset
  end
end
