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

alias Getthatjob.Recruitment

{:ok, peru} =
  Recruitment.create_country(%{
    name: "Peru",
    flag_path_meta: %{
      path: Path.absname("./assets/static/peru-flag.png"),
      filename: "peru-flag.png"
    }
  })

{:ok, venezuela} =
  Recruitment.create_country(%{
    name: "Venezuela",
    flag_path_meta: %{
      path: Path.absname("./assets/static/venezuela-flag.png"),
      filename: "venezuela-flag.png"
    }
  })

{:ok, city1} =
  Recruitment.create_city(peru, %{
    name: "Lima"
  })

{:ok, city2} =
  Recruitment.create_city(peru, %{
    name: "Huaraz"
  })

{:ok, city3} =
  Recruitment.create_city(venezuela, %{
    name: "Caracas"
  })

{:ok, type_full} =
  Recruitment.create_job_type(%{
    name: "Full Time"
  })

{:ok, type_part} =
  Recruitment.create_job_type(%{
    name: "Part Time"
  })

{:ok, type_freelancer} =
  Recruitment.create_job_type(%{
    name: "Freelance"
  })

{:ok, type_intership} =
  Recruitment.create_job_type(%{
    name: "Intership"
  })

{:ok, seniority_junior} =
  Recruitment.create_seniority(%{
    name: "Junior"
  })

{:ok, seniority_semi} =
  Recruitment.create_seniority(%{
    name: "Semi Senior"
  })

{:ok, seniority_senior} =
  Recruitment.create_seniority(%{
    name: "Senior"
  })

{:ok, seniority_expert} =
  Recruitment.create_seniority(%{
    name: "Expert"
  })

{:ok, profesional} =
  Recruitment.create_professional(%{
    name: "Albert",
    phone_number: "11111111",
    description: "Holi",
    experience: "Woli",
    user: %{
      email: "acastemoreno@gmail.com",
      password: "123456",
      password_confirmation: "123456"
    }
  })

{:ok, recruiter} =
  Recruitment.create_recruiter(%{
    company_description: "Codeable Description",
    company_name: "Codeable",
    company_website: "codeable.pe",
    user: %{
      email: "ricardohuamanip@gmail.com",
      password: "123456",
      password_confirmation: "123456"
    },
    company_logo_meta: %{
      path: Path.absname("./assets/static/able.png"),
      filename: "able.png"
    }
  })

{:ok, job1} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city1, seniority: seniority_expert, job_type: type_full},
    %{
      title: "Job Title 1",
      type: "Job type 1",
      seniority: "Job Seniority 1",
      salary: 1,
      introduction: "Job Introduction 1",
      expected: "Job expected 1",
      looking_for: "Job looking for 1",
      requirements: "Job Requirement 1"
    }
  )

{:ok, job2} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city2, seniority: seniority_junior, job_type: type_intership},
    %{
      title: "Job Title 2",
      type: "Job type 2",
      seniority: "Job Seniority 2",
      salary: 1,
      introduction: "Job Introduction 2",
      expected: "Job expected 2",
      looking_for: "Job looking for 2",
      requirements: "Job Requirement 2"
    }
  )

{:ok, job3} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city1, seniority: seniority_senior, job_type: type_part},
    %{
      title: "Job Title 3",
      type: "Job type 3",
      seniority: "Job Seniority 3",
      salary: 1,
      introduction: "Job Introduction 3",
      expected: "Job expected 3",
      looking_for: "Job looking for 3",
      requirements: "Job Requirement 3"
    }
  )

{:ok, job4} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city3, seniority: seniority_semi, job_type: type_freelancer},
    %{
      title: "Job Title 4",
      type: "Job type 4",
      seniority: "Job Seniority 4",
      salary: 2,
      introduction: "Job Introduction 4",
      expected: "Job expected 4",
      looking_for: "Job looking for 4",
      requirements: "Job Requirement 4"
    }
  )

{:ok, _application} =
  Recruitment.create_application(job1, profesional, %{
    professional_experience: "professional_experience1",
    reason: "reason job1",
    cv_path: "cv_path1"
  })

{:ok, _application} =
  Recruitment.create_application(job2, profesional, %{
    professional_experience: "professional_experience2",
    reason: "reason job2",
    cv_path: "cv_path2"
  })
