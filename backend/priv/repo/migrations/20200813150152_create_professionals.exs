defmodule Getthatjob.Repo.Migrations.CreateProfessionals do
  use Ecto.Migration

  def change do
    create table(:professionals) do
      add(:name, :string, default: "")
      add(:phone_number, :string, default: "")
      add(:description, :string, default: "")
      add(:experience, :text, default: "")
      add(:linkedin, :string, default: "")
      add(:github, :string, default: "")

      timestamps()
    end
  end
end
