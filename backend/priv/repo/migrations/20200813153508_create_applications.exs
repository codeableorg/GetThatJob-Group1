defmodule Getthatjob.Repo.Migrations.CreateApplications do
  use Ecto.Migration

  def change do
    create table(:applications) do
      add :cv_path, :string
      add :professional_experience, :text
      add :reason, :text
      add :job_id, references(:jobs, on_delete: :nothing)
      add :professional_id, references(:professionals, on_delete: :nothing)

      timestamps()
    end

    create index(:applications, [:job_id])
    create index(:applications, [:professional_id])
  end
end
