defmodule Getthatjob.Repo.Migrations.CreateProfessionals do
  use Ecto.Migration

  def change do
    create table(:professionals) do
      add :name, :string, null: false
      add :phone_number, :string, null: false
      add :description, :string, null: false
      add :experience, :text, null: false
      add :linkedin, :string, null: true
      add :github, :string, null: true

      timestamps()
    end
  end
end
