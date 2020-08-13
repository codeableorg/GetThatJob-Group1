defmodule Getthatjob.Repo.Migrations.CreateProfessionals do
  use Ecto.Migration

  def change do
    create table(:professionals) do
      add :name, :string
      add :phone_number, :string
      add :description, :string
      add :experience, :text
      add :linkedin, :string
      add :github, :string

      timestamps()
    end

  end
end
