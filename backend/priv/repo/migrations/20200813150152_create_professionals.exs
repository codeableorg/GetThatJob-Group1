defmodule Getthatjob.Repo.Migrations.CreateProfessionals do
  use Ecto.Migration

  def change do
    create table(:professionals) do
      add :name, :string, null: true
      add :phone_number, :string, null: true
      add :description, :string, null: true
      add :experience, :text, null: true
      add :linkedin, :string, null: true
      add :github, :string, null: true

      timestamps()
    end
  end
end
