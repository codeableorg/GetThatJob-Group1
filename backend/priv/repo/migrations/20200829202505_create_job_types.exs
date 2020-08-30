defmodule Getthatjob.Repo.Migrations.CreateJobTypes do
  use Ecto.Migration

  def change do
    create table(:job_types) do
      add :name, :string, null: false

      timestamps()
    end

    create unique_index(:job_types, [:name])
  end
end
