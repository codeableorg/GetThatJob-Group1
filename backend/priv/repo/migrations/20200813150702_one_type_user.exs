defmodule Getthatjob.Repo.Migrations.OneTypeUser do
  use Ecto.Migration

  def change do
    fk_check = """
      (CASE WHEN professional_id IS NULL THEN 0 ELSE 1 END) +
      (CASE WHEN recruiter_id IS NULL THEN 0 ELSE 1 END) = 1
    """

    create(constraint("users", :one_type_user, check: fk_check))
  end
end
