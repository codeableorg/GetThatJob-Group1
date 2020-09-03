defmodule Getthatjob.Repo.Migrations.CreateCountries do
  use Ecto.Migration

  def change do
    create table(:countries) do
      add :name, :string, null: false
      add :flag_path, :string, null: false

      timestamps()
    end

    create unique_index(:countries, [:name])
    create unique_index(:countries, [:flag_path])
  end
end
