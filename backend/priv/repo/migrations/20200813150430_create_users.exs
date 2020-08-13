defmodule Getthatjob.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :professional_id, references(:professionals, on_delete: :nothing), null: true
      add :recruiter_id, references(:recruiters, on_delete: :nothing), null: true

      timestamps()
    end

    create unique_index(:users, [:email])
    create index(:users, [:professional_id])
    create index(:users, [:recruiter_id])
  end
end
