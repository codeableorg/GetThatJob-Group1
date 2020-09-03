defmodule Getthatjob.Repo.Migrations.CreateSeniorities do
  use Ecto.Migration

  def change do
    create table(:seniorities) do
      add :name, :string, null: false

      timestamps()
    end

    create unique_index(:seniorities, [:name])
  end
end
