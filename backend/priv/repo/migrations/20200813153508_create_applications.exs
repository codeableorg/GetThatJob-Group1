defmodule Getthatjob.Repo.Migrations.CreateApplications do
  use Ecto.Migration

  def change do
    create table(:applications) do
      add :cv_path, :string, null: false
      add :professional_experience, :text, null: false
      add :reason, :text, null: false
      add :job_id, references(:jobs, on_delete: :nothing), null: false
      add :professional_id, references(:professionals, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:applications, [:job_id])
    create index(:applications, [:professional_id])
  end
end
