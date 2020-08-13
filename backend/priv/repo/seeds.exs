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

alias Getthatjob.{Account, Recruitment}

{:ok, profesional} =
  Recruitment.create_professional(%{
    name: "Albert",
    phone_number: "11111111",
    description: "Holi",
    experience: "Woli"
  })

{:ok, recruiter} =
  Recruitment.create_recruiter(%{
    company_description: "Codeable Description",
    company_logo_path: "asd",
    company_name: "Codeable",
    company_website: "codeable.pe"
  })

{:ok, _} =
  Account.create_user(profesional, %{email: "acastemoreno@gmail.com", password: "123456"})

{:ok, _} =
  Account.create_user(recruiter, %{email: "ricardohuamanip@gmail.com", password: "123456"})
