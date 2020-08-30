defmodule Getthatjob.Repo.Migrations.AddSeniorityAndJobTypeReferenceToJobs do
  use Ecto.Migration

  def change do
    alter table(:jobs) do
      remove :seniority, :string, null: false
      remove :type, :string, null: false
      add :seniority_id, references(:seniorities, on_delete: :nothing), null: false
      add :job_type_id, references(:job_types, on_delete: :nothing), null: false
    end
  end
end
