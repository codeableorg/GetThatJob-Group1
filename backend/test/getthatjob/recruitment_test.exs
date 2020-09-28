defmodule Getthatjob.RecruitmentTest do
  use Getthatjob.DataCase

  alias Getthatjob.Recruitment

  describe "recruiters" do
    alias Getthatjob.Recruitment.Recruiter

    @valid_attrs %{
      company_description: "some company_description",
      company_logo_path: "some company_logo_path",
      company_name: "some company_name",
      company_website: "some company_website"
    }
    @update_attrs %{
      company_description: "some updated company_description",
      company_logo_path: "some updated company_logo_path",
      company_name: "some updated company_name",
      company_website: "some updated company_website"
    }
    @invalid_attrs %{company_description: nil, company_logo_path: nil, company_name: nil, company_website: nil}

    def recruiter_fixture(attrs \\ %{}) do
      {:ok, recruiter} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_recruiter()

      recruiter
    end

    test "list_recruiters/0 returns all recruiters" do
      recruiter = recruiter_fixture()
      assert Recruitment.list_recruiters() == [recruiter]
    end

    test "get_recruiter!/1 returns the recruiter with given id" do
      recruiter = recruiter_fixture()
      assert Recruitment.get_recruiter!(recruiter.id) == recruiter
    end

    test "create_recruiter/1 with valid data creates a recruiter" do
      assert {:ok, %Recruiter{} = recruiter} = Recruitment.create_recruiter(@valid_attrs)
      assert recruiter.company_description == "some company_description"
      assert recruiter.company_logo_path == "some company_logo_path"
      assert recruiter.company_name == "some company_name"
      assert recruiter.company_website == "some company_website"
    end

    test "create_recruiter/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_recruiter(@invalid_attrs)
    end

    test "update_recruiter/2 with valid data updates the recruiter" do
      recruiter = recruiter_fixture()
      assert {:ok, %Recruiter{} = recruiter} = Recruitment.update_recruiter(recruiter, @update_attrs)
      assert recruiter.company_description == "some updated company_description"
      assert recruiter.company_logo_path == "some updated company_logo_path"
      assert recruiter.company_name == "some updated company_name"
      assert recruiter.company_website == "some updated company_website"
    end

    test "update_recruiter/2 with invalid data returns error changeset" do
      recruiter = recruiter_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_recruiter(recruiter, @invalid_attrs)
      assert recruiter == Recruitment.get_recruiter!(recruiter.id)
    end

    test "delete_recruiter/1 deletes the recruiter" do
      recruiter = recruiter_fixture()
      assert {:ok, %Recruiter{}} = Recruitment.delete_recruiter(recruiter)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_recruiter!(recruiter.id) end
    end

    test "change_recruiter/1 returns a recruiter changeset" do
      recruiter = recruiter_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_recruiter(recruiter)
    end
  end

  describe "professionals" do
    alias Getthatjob.Recruitment.Professional

    @valid_attrs %{
      description: "some description",
      experience: "some experience",
      github: "some github",
      linkedin: "some linkedin",
      name: "some name",
      phone_number: "some phone_number"
    }
    @update_attrs %{
      description: "some updated description",
      experience: "some updated experience",
      github: "some updated github",
      linkedin: "some updated linkedin",
      name: "some updated name",
      phone_number: "some updated phone_number"
    }
    @invalid_attrs %{description: nil, experience: nil, github: nil, linkedin: nil, name: nil, phone_number: nil}

    def professional_fixture(attrs \\ %{}) do
      {:ok, professional} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_professional()

      professional
    end

    test "list_professionals/0 returns all professionals" do
      professional = professional_fixture()
      assert Recruitment.list_professionals() == [professional]
    end

    test "get_professional!/1 returns the professional with given id" do
      professional = professional_fixture()
      assert Recruitment.get_professional!(professional.id) == professional
    end

    test "create_professional/1 with valid data creates a professional" do
      assert {:ok, %Professional{} = professional} = Recruitment.create_professional(@valid_attrs)
      assert professional.description == "some description"
      assert professional.experience == "some experience"
      assert professional.github == "some github"
      assert professional.linkedin == "some linkedin"
      assert professional.name == "some name"
      assert professional.phone_number == "some phone_number"
    end

    test "create_professional/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_professional(@invalid_attrs)
    end

    test "update_professional/2 with valid data updates the professional" do
      professional = professional_fixture()
      assert {:ok, %Professional{} = professional} = Recruitment.update_professional(professional, @update_attrs)
      assert professional.description == "some updated description"
      assert professional.experience == "some updated experience"
      assert professional.github == "some updated github"
      assert professional.linkedin == "some updated linkedin"
      assert professional.name == "some updated name"
      assert professional.phone_number == "some updated phone_number"
    end

    test "update_professional/2 with invalid data returns error changeset" do
      professional = professional_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_professional(professional, @invalid_attrs)
      assert professional == Recruitment.get_professional!(professional.id)
    end

    test "delete_professional/1 deletes the professional" do
      professional = professional_fixture()
      assert {:ok, %Professional{}} = Recruitment.delete_professional(professional)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_professional!(professional.id) end
    end

    test "change_professional/1 returns a professional changeset" do
      professional = professional_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_professional(professional)
    end
  end

  describe "jobs" do
    alias Getthatjob.Recruitment.Job

    @valid_attrs %{
      expected: "some expected",
      introduction: "some introduction",
      location: "some location",
      looking_for: "some looking_for",
      requirements: "some requirements",
      salary: 42,
      seniority: "some seniority",
      title: "some title",
      type: "some type"
    }
    @update_attrs %{
      expected: "some updated expected",
      introduction: "some updated introduction",
      location: "some updated location",
      looking_for: "some updated looking_for",
      requirements: "some updated requirements",
      salary: 43,
      seniority: "some updated seniority",
      title: "some updated title",
      type: "some updated type"
    }
    @invalid_attrs %{
      expected: nil,
      introduction: nil,
      location: nil,
      looking_for: nil,
      requirements: nil,
      salary: nil,
      seniority: nil,
      title: nil,
      type: nil
    }

    def job_fixture(attrs \\ %{}) do
      {:ok, job} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_job()

      job
    end

    test "list_jobs/0 returns all jobs" do
      job = job_fixture()
      assert Recruitment.list_jobs() == [job]
    end

    test "get_job!/1 returns the job with given id" do
      job = job_fixture()
      assert Recruitment.get_job!(job.id) == job
    end

    test "create_job/1 with valid data creates a job" do
      assert {:ok, %Job{} = job} = Recruitment.create_job(@valid_attrs)
      assert job.expected == "some expected"
      assert job.introduction == "some introduction"
      assert job.location == "some location"
      assert job.looking_for == "some looking_for"
      assert job.requirements == "some requirements"
      assert job.salary == 42
      assert job.seniority == "some seniority"
      assert job.title == "some title"
      assert job.type == "some type"
    end

    test "create_job/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_job(@invalid_attrs)
    end

    test "update_job/2 with valid data updates the job" do
      job = job_fixture()
      assert {:ok, %Job{} = job} = Recruitment.update_job(job, @update_attrs)
      assert job.expected == "some updated expected"
      assert job.introduction == "some updated introduction"
      assert job.location == "some updated location"
      assert job.looking_for == "some updated looking_for"
      assert job.requirements == "some updated requirements"
      assert job.salary == 43
      assert job.seniority == "some updated seniority"
      assert job.title == "some updated title"
      assert job.type == "some updated type"
    end

    test "update_job/2 with invalid data returns error changeset" do
      job = job_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_job(job, @invalid_attrs)
      assert job == Recruitment.get_job!(job.id)
    end

    test "delete_job/1 deletes the job" do
      job = job_fixture()
      assert {:ok, %Job{}} = Recruitment.delete_job(job)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_job!(job.id) end
    end

    test "change_job/1 returns a job changeset" do
      job = job_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_job(job)
    end
  end

  describe "applications" do
    alias Getthatjob.Recruitment.Application

    @valid_attrs %{
      cv_path: "some cv_path",
      professional_experience: "some professional_experience",
      reason: "some reason"
    }
    @update_attrs %{
      cv_path: "some updated cv_path",
      professional_experience: "some updated professional_experience",
      reason: "some updated reason"
    }
    @invalid_attrs %{cv_path: nil, professional_experience: nil, reason: nil}

    def application_fixture(attrs \\ %{}) do
      {:ok, application} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_application()

      application
    end

    test "list_applications/0 returns all applications" do
      application = application_fixture()
      assert Recruitment.list_applications() == [application]
    end

    test "get_application!/1 returns the application with given id" do
      application = application_fixture()
      assert Recruitment.get_application!(application.id) == application
    end

    test "create_application/1 with valid data creates a application" do
      assert {:ok, %Application{} = application} = Recruitment.create_application(@valid_attrs)
      assert application.cv_path == "some cv_path"
      assert application.professional_experience == "some professional_experience"
      assert application.reason == "some reason"
    end

    test "create_application/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_application(@invalid_attrs)
    end

    test "update_application/2 with valid data updates the application" do
      application = application_fixture()
      assert {:ok, %Application{} = application} = Recruitment.update_application(application, @update_attrs)
      assert application.cv_path == "some updated cv_path"
      assert application.professional_experience == "some updated professional_experience"
      assert application.reason == "some updated reason"
    end

    test "update_application/2 with invalid data returns error changeset" do
      application = application_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_application(application, @invalid_attrs)
      assert application == Recruitment.get_application!(application.id)
    end

    test "delete_application/1 deletes the application" do
      application = application_fixture()
      assert {:ok, %Application{}} = Recruitment.delete_application(application)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_application!(application.id) end
    end

    test "change_application/1 returns a application changeset" do
      application = application_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_application(application)
    end
  end

  describe "countries" do
    alias Getthatjob.Recruitment.Country

    @valid_attrs %{flag_path: "some flag_path", name: "some name"}
    @update_attrs %{flag_path: "some updated flag_path", name: "some updated name"}
    @invalid_attrs %{flag_path: nil, name: nil}

    def country_fixture(attrs \\ %{}) do
      {:ok, country} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_country()

      country
    end

    test "list_countries/0 returns all countries" do
      country = country_fixture()
      assert Recruitment.list_countries() == [country]
    end

    test "get_country!/1 returns the country with given id" do
      country = country_fixture()
      assert Recruitment.get_country!(country.id) == country
    end

    test "create_country/1 with valid data creates a country" do
      assert {:ok, %Country{} = country} = Recruitment.create_country(@valid_attrs)
      assert country.flag_path == "some flag_path"
      assert country.name == "some name"
    end

    test "create_country/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_country(@invalid_attrs)
    end

    test "update_country/2 with valid data updates the country" do
      country = country_fixture()
      assert {:ok, %Country{} = country} = Recruitment.update_country(country, @update_attrs)
      assert country.flag_path == "some updated flag_path"
      assert country.name == "some updated name"
    end

    test "update_country/2 with invalid data returns error changeset" do
      country = country_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_country(country, @invalid_attrs)
      assert country == Recruitment.get_country!(country.id)
    end

    test "delete_country/1 deletes the country" do
      country = country_fixture()
      assert {:ok, %Country{}} = Recruitment.delete_country(country)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_country!(country.id) end
    end

    test "change_country/1 returns a country changeset" do
      country = country_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_country(country)
    end
  end

  describe "cities" do
    alias Getthatjob.Recruitment.City

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def city_fixture(attrs \\ %{}) do
      {:ok, city} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_city()

      city
    end

    test "list_cities/0 returns all cities" do
      city = city_fixture()
      assert Recruitment.list_cities() == [city]
    end

    test "get_city!/1 returns the city with given id" do
      city = city_fixture()
      assert Recruitment.get_city!(city.id) == city
    end

    test "create_city/1 with valid data creates a city" do
      assert {:ok, %City{} = city} = Recruitment.create_city(@valid_attrs)
      assert city.name == "some name"
    end

    test "create_city/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_city(@invalid_attrs)
    end

    test "update_city/2 with valid data updates the city" do
      city = city_fixture()
      assert {:ok, %City{} = city} = Recruitment.update_city(city, @update_attrs)
      assert city.name == "some updated name"
    end

    test "update_city/2 with invalid data returns error changeset" do
      city = city_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_city(city, @invalid_attrs)
      assert city == Recruitment.get_city!(city.id)
    end

    test "delete_city/1 deletes the city" do
      city = city_fixture()
      assert {:ok, %City{}} = Recruitment.delete_city(city)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_city!(city.id) end
    end

    test "change_city/1 returns a city changeset" do
      city = city_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_city(city)
    end
  end

  describe "seniorities" do
    alias Getthatjob.Recruitment.Seniority

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def seniority_fixture(attrs \\ %{}) do
      {:ok, seniority} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_seniority()

      seniority
    end

    test "list_seniorities/0 returns all seniorities" do
      seniority = seniority_fixture()
      assert Recruitment.list_seniorities() == [seniority]
    end

    test "get_seniority!/1 returns the seniority with given id" do
      seniority = seniority_fixture()
      assert Recruitment.get_seniority!(seniority.id) == seniority
    end

    test "create_seniority/1 with valid data creates a seniority" do
      assert {:ok, %Seniority{} = seniority} = Recruitment.create_seniority(@valid_attrs)
      assert seniority.name == "some name"
    end

    test "create_seniority/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_seniority(@invalid_attrs)
    end

    test "update_seniority/2 with valid data updates the seniority" do
      seniority = seniority_fixture()
      assert {:ok, %Seniority{} = seniority} = Recruitment.update_seniority(seniority, @update_attrs)
      assert seniority.name == "some updated name"
    end

    test "update_seniority/2 with invalid data returns error changeset" do
      seniority = seniority_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_seniority(seniority, @invalid_attrs)
      assert seniority == Recruitment.get_seniority!(seniority.id)
    end

    test "delete_seniority/1 deletes the seniority" do
      seniority = seniority_fixture()
      assert {:ok, %Seniority{}} = Recruitment.delete_seniority(seniority)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_seniority!(seniority.id) end
    end

    test "change_seniority/1 returns a seniority changeset" do
      seniority = seniority_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_seniority(seniority)
    end
  end

  describe "job_types" do
    alias Getthatjob.Recruitment.JobType

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def job_type_fixture(attrs \\ %{}) do
      {:ok, job_type} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recruitment.create_job_type()

      job_type
    end

    test "list_job_types/0 returns all job_types" do
      job_type = job_type_fixture()
      assert Recruitment.list_job_types() == [job_type]
    end

    test "get_job_type!/1 returns the job_type with given id" do
      job_type = job_type_fixture()
      assert Recruitment.get_job_type!(job_type.id) == job_type
    end

    test "create_job_type/1 with valid data creates a job_type" do
      assert {:ok, %JobType{} = job_type} = Recruitment.create_job_type(@valid_attrs)
      assert job_type.name == "some name"
    end

    test "create_job_type/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recruitment.create_job_type(@invalid_attrs)
    end

    test "update_job_type/2 with valid data updates the job_type" do
      job_type = job_type_fixture()
      assert {:ok, %JobType{} = job_type} = Recruitment.update_job_type(job_type, @update_attrs)
      assert job_type.name == "some updated name"
    end

    test "update_job_type/2 with invalid data returns error changeset" do
      job_type = job_type_fixture()
      assert {:error, %Ecto.Changeset{}} = Recruitment.update_job_type(job_type, @invalid_attrs)
      assert job_type == Recruitment.get_job_type!(job_type.id)
    end

    test "delete_job_type/1 deletes the job_type" do
      job_type = job_type_fixture()
      assert {:ok, %JobType{}} = Recruitment.delete_job_type(job_type)
      assert_raise Ecto.NoResultsError, fn -> Recruitment.get_job_type!(job_type.id) end
    end

    test "change_job_type/1 returns a job_type changeset" do
      job_type = job_type_fixture()
      assert %Ecto.Changeset{} = Recruitment.change_job_type(job_type)
    end
  end
end
