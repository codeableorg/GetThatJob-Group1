defmodule Getthatjob.Repo.Migrations.CreateRecruiters do
  use Ecto.Migration

  def change do
    create table(:recruiters) do
      add :company_name, :string
      add :company_logo_path, :string
      add :company_website, :string
      add :company_description, :text

      timestamps()
    end

  end
end
