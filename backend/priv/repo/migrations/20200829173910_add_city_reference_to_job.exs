defmodule Getthatjob.Repo.Migrations.AddCityReferenceToJob do
  use Ecto.Migration

  def change do
    alter table(:jobs) do
      remove(:location, :string, null: false, default: "")
      add(:city_id, references(:cities, on_delete: :nothing), null: false)
    end
  end
end
