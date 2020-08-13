defmodule Getthatjob.Repo.Migrations.CreateRecruiters do
  use Ecto.Migration

  def change do
    create table(:recruiters) do
      add :company_name, :string, null: false
      add :company_logo_path, :string, null: false
      add :company_website, :string, null: false
      add :company_description, :text, null: false

      timestamps()
    end
  end
end
