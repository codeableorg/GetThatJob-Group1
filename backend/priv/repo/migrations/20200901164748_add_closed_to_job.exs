defmodule Getthatjob.Repo.Migrations.AddClosedToJob do
  use Ecto.Migration

  def change do
    alter table(:jobs) do
      add(:closed, :boolean, default: false)
    end
  end
end
