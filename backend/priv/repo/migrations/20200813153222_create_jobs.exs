defmodule Getthatjob.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :title, :string, null: false
      add :type, :string, null: false
      add :seniority, :string, null: false
      add :salary, :integer, null: true
      add :location, :string, null: false
      add :introduction, :text, null: false
      add :expected, :text, null: false
      add :looking_for, :text, null: false
      add :requirements, :text, null: false
      add :recruiter_id, references(:recruiters, on_delete: :nothing)

      timestamps()
    end

    create index(:jobs, [:recruiter_id])
  end
end
