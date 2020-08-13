defmodule Getthatjob.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :title, :string
      add :type, :string
      add :seniority, :string
      add :salary, :integer
      add :location, :string
      add :introduction, :text
      add :expected, :text
      add :looking_for, :text
      add :requirements, :text
      add :recruiter_id, references(:recruiters, on_delete: :nothing)

      timestamps()
    end

    create index(:jobs, [:recruiter_id])
  end
end
