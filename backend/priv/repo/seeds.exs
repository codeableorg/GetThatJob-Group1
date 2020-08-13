# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Getthatjob.Repo.insert!(%Getthatjob.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

professional = Getthatjob.Repo.insert!(%Getthatjob.Recruitment.Professional{})
recruiter = Getthatjob.Repo.insert!(%Getthatjob.Recruitment.Recruiter{})

Getthatjob.Repo.insert!(%Getthatjob.Account.User{
  recruiter_id: recruiter.id
})

Getthatjob.Repo.insert!(%Getthatjob.Account.User{
  professional_id: professional.id
})
