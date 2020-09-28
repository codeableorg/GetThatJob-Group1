defmodule Getthatjob.Recruitment.Country do
  use Ecto.Schema
  import Ecto.Changeset
  alias Getthatjob.Recruitment.City

  schema "countries" do
    field(:flag_path_meta, :map, virtual: true)
    field(:flag_path, :string)
    field(:name, :string)
    has_many(:cities, City)

    timestamps()
  end

  @doc false
  def changeset(country, attrs) do
    country
    |> cast(attrs, [:name, :flag_path_meta])
    |> validate_required([:name, :flag_path_meta])
    |> unique_constraint(:name)
    |> process_flag()
    |> unique_constraint(:flag_path)
  end

  @doc false
  defp process_flag(
         %Ecto.Changeset{
           valid?: true,
           changes: %{
             flag_path_meta: %{
               path: path,
               filename: filename
             }
           }
         } = changeset
       ) do
    with new_filename <- Ecto.UUID.generate(),
         extension <- Path.extname(filename),
         new_path <- Path.absname("./priv/flags/" <> new_filename <> extension),
         {:ok, _} <- File.copy(path, new_path) do
      put_change(changeset, :flag_path, "/flags/" <> new_filename <> extension)
    else
      _ ->
        changeset
        |> add_error(:flag_path_meta, "could not upload file")
    end
  end
end
