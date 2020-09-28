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
  Recruitment.create_country(
    %{
      name: "Peru",
      flag_path_meta: %{
        path: Path.absname("./assets/static/peru-flag.png"),
        filename: "peru-flag.png"
      }
    }
  )

{:ok, venezuela} =
  Recruitment.create_country(
    %{
      name: "Venezuela",
      flag_path_meta: %{
        path: Path.absname("./assets/static/venezuela-flag.png"),
        filename: "venezuela-flag.png"
      }
    }
  )

{:ok, city1} =
  Recruitment.create_city(
    peru,
    %{
      name: "Lima"
    }
  )

{:ok, city2} =
  Recruitment.create_city(
    peru,
    %{
      name: "Huaraz"
    }
  )

{:ok, city3} =
  Recruitment.create_city(
    venezuela,
    %{
      name: "Caracas"
    }
  )

{:ok, type_full} =
  Recruitment.create_job_type(
    %{
      name: "Full Time"
    }
  )

{:ok, type_part} =
  Recruitment.create_job_type(
    %{
      name: "Part Time"
    }
  )

{:ok, type_freelancer} =
  Recruitment.create_job_type(
    %{
      name: "Freelance"
    }
  )

{:ok, type_intership} =
  Recruitment.create_job_type(
    %{
      name: "Intership"
    }
  )

{:ok, seniority_junior} =
  Recruitment.create_seniority(
    %{
      name: "Junior"
    }
  )

{:ok, seniority_semi} =
  Recruitment.create_seniority(
    %{
      name: "Semi Senior"
    }
  )

{:ok, seniority_senior} =
  Recruitment.create_seniority(
    %{
      name: "Senior"
    }
  )

{:ok, seniority_expert} =
  Recruitment.create_seniority(
    %{
      name: "Expert"
    }
  )

{:ok, profesional} =
  Recruitment.create_professional(
    %{
      name: "Albert",
      phone_number: "11111111",
      description: "Alchemist",
      experience: "Woli",
      user: %{
        email: "acastemoreno@gmail.com",
        password: "123456",
        password_confirmation: "123456"
      }
    }
  )

{:ok, profesional2} =
  Recruitment.create_professional(
    %{
      name: "Amiguito",
      phone_number: "6666666",
      description: "Pokemon Trainer",
      experience: "League Winner",
      user: %{
        email: "amiguito@gmail.com",
        password: "123456",
        password_confirmation: "123456"
      }
    }
  )

{:ok, recruiter} =
  Recruitment.create_recruiter(
    %{
      company_description:
        "Able builds technology products in a portfolio model. We believe that people, teams, and processes are more important than the ideas themselves, so we’ve focused on bringing great people together, and investing in their growth.",
      company_name: "Able",
      company_website: "https://able.co/",
      user: %{
        email: "ricardohuamanip@gmail.com",
        password: "123456",
        password_confirmation: "123456"
      },
      company_logo_meta: %{
        path: Path.absname("./assets/static/able.png"),
        filename: "able.png"
      }
    }
  )

{:ok, job1} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city1, seniority: seniority_expert, job_type: type_full},
    %{
      title: "Software Engineer",
      type: "Job type 1",
      seniority: "Job Seniority 1",
      salary: 1,
      introduction:
        "Able is seeking a Full-Stack Software Engineer. You will work on a variety of challenging, creative and innovative products that are part of our rapidly growing portfolio. Your experience will serve as a foundation for your growth at our company and we expect that you will keep developing your existing skills by growing your knowledge in areas you had never envisioned before.",
      expected: "Build server-side applications as well as RESTful APIs with Ruby and Rails",
      looking_for:
        "You have a passion for collaborative problem solving and the willingness to challenge, debate and form relationships with team members",
      requirements: "2+ years professional experience as a software engineer or equivalent"
    }
  )

{:ok, job2} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city2, seniority: seniority_junior, job_type: type_intership},
    %{
      title: "Software Engineer",
      type: "Job type 2",
      seniority: "Job Seniority 2",
      salary: 1,
      introduction:
        "Able is seeking a Full-Stack Software Engineer. You will work on a variety of challenging, creative and innovative products that are part of our rapidly growing portfolio. Your experience will serve as a foundation for your growth at our company and we expect that you will keep developing your existing skills by growing your knowledge in areas you had never envisioned before.",
      expected: "Build server-side applications as well as RESTful APIs with Ruby and Rails",
      looking_for:
        "You have a passion for collaborative problem solving and the willingness to challenge, debate and form relationships with team members",
      requirements: "2+ years professional experience as a software engineer or equivalent"
    }
  )

{:ok, job3} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city1, seniority: seniority_senior, job_type: type_part},
    %{
      title: "Software Engineer",
      type: "Job type 3",
      seniority: "Job Seniority 3",
      salary: 1,
      introduction:
        "Able is seeking a Full-Stack Software Engineer. You will work on a variety of challenging, creative and innovative products that are part of our rapidly growing portfolio. Your experience will serve as a foundation for your growth at our company and we expect that you will keep developing your existing skills by growing your knowledge in areas you had never envisioned before.",
      expected: "Build server-side applications as well as RESTful APIs with Ruby and Rails",
      looking_for:
        "You have a passion for collaborative problem solving and the willingness to challenge, debate and form relationships with team members",
      requirements: "2+ years professional experience as a software engineer or equivalent"
    }
  )

{:ok, job4} =
  Recruitment.create_job(
    %{recruiter: recruiter, city: city3, seniority: seniority_semi, job_type: type_freelancer},
    %{
      title: "Software Engineer",
      type: "Job type 4",
      seniority: "Job Seniority 4",
      salary: 2,
      introduction:
        "Able is seeking a Full-Stack Software Engineer. You will work on a variety of challenging, creative and innovative products that are part of our rapidly growing portfolio. Your experience will serve as a foundation for your growth at our company and we expect that you will keep developing your existing skills by growing your knowledge in areas you had never envisioned before.",
      expected: "Build server-side applications as well as RESTful APIs with Ruby and Rails",
      looking_for:
        "You have a passion for collaborative problem solving and the willingness to challenge, debate and form relationships with team members",
      requirements: "2+ years professional experience as a software engineer or equivalent"
    }
  )

{:ok, _application} =
  Recruitment.create_application(
    job1,
    profesional,
    %{
      professional_experience:
        "This is the professional experience the candidate wrote on their application.It could be several lines long. :D",
      reason: "This is the awnser the applicant wrote.",
      cv_meta: %{
        path: Path.absname("./assets/static/Resume - Albert Castellano.pdf"),
        filename: "Resume - Albert Castellano.pdf"
      }
    }
  )

{:ok, _application} =
  Recruitment.create_application(
    job2,
    profesional,
    %{
      professional_experience:
        "This is the professional experience the candidate wrote on their application.It could be several lines long. :D",
      reason: "This is the awnser the applicant wrote.",
      cv_meta: %{
        path: Path.absname("./assets/static/Resume - Albert Castellano.pdf"),
        filename: "Resume - Albert Castellano.pdf"
      }
    }
  )

{:ok, _application} =
  Recruitment.create_application(
    job1,
    profesional2,
    %{
      professional_experience:
        "This is the professional experience the candidate wrote on their application.It could be several lines long. :D",
      reason: "This is the awnser the applicant wrote.",
      cv_meta: %{
        path: Path.absname("./assets/static/Resume - Albert Castellano.pdf"),
        filename: "Resume - Albert Castellano.pdf"
      }
    }
  )
