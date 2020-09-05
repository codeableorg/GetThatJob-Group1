defmodule Getthatjob.Recruitment.Application do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.{Job, Professional}

  schema "applications" do
    field(:cv_path, :string)
    field(:cv_meta, :map, virtual: true)
    field(:professional_experience, :string)
    field(:reason, :string)
    belongs_to(:job, Job)
    belongs_to(:professional, Professional)

    timestamps()
  end

  @doc false
  def changeset(application, attrs) do
    application
    |> cast(attrs, [:cv_meta, :professional_experience, :reason])
    |> validate_required([:cv_meta, :professional_experience, :reason])
    |> process_cv()
  end

  @doc false
  defp process_cv(
         %Ecto.Changeset{
           valid?: true,
           changes: %{cv_meta: %{path: path, filename: filename}},
           data: %__MODULE__{cv_path: nil}
         } = changeset
       ) do
    with new_filename <- Ecto.UUID.generate(),
         extension <- Path.extname(filename),
         new_path <- Path.absname("./priv/cv/" <> new_filename <> extension),
         {:ok, _} <- File.copy(path, new_path) do
      put_change(changeset, :cv_path, "/cv/" <> new_filename <> extension)
    else
      _ ->
        changeset |> add_error(:cv_meta, "could not upload file")
    end
  end

  defp process_cv(
         %Ecto.Changeset{
           valid?: true,
           changes: %{cv_meta: %{path: path, filename: filename}},
           data: %__MODULE__{cv_path: cv_path}
         } = changeset
       ) do
    with new_filename <- Ecto.UUID.generate(),
         extension <- Path.extname(filename),
         new_path <- Path.absname("./priv/cv/" <> new_filename <> extension),
         :ok <- Path.absname("./priv" <> cv_path) |> File.rm(),
         {:ok, _} <- File.copy(path, new_path) do
      put_change(changeset, :cv_path, "/cv/" <> new_filename <> extension)
    else
      _ ->
        changeset |> add_error(:cv_meta, "could not upload file")
    end
  end

  @doc false
  defp process_cv(changeset) do
    changeset
  end
end
