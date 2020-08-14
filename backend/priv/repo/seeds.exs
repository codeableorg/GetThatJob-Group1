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

{:ok, job1} =
  Recruitment.create_job(recruiter, %{
    title: "Job Title 1",
    type: "Job type 1",
    seniority: "Job Seniority 1",
    salary: 1,
    location: "Lima",
    introduction: "Job Introduction 1",
    expected: "Job expected 1",
    looking_for: "Job looking for 1",
    requirements: "Job Requirement 1"
  })

{:ok, job2} =
  Recruitment.create_job(recruiter, %{
    title: "Job Title 2",
    type: "Job type 2",
    seniority: "Job Seniority 2",
    salary: 1,
    location: "Lima",
    introduction: "Job Introduction 2",
    expected: "Job expected 2",
    looking_for: "Job looking for 2",
    requirements: "Job Requirement 2"
  })

{:ok, _application} =
  Recruitment.create_application(job1, profesional, %{
    professional_experience: "professional_experience1",
    reason: "reason job1",
    cv_path: "cv_path1"
  })

{:ok, application} =
  Recruitment.create_application(job2, profesional, %{
    professional_experience: "professional_experience2",
    reason: "reason job2",
    cv_path: "cv_path2"
  })
