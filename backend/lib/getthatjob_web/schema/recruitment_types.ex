defmodule GetthatjobWeb.Schema.RecruitmentTypes do
  use Absinthe.Schema.Notation
  alias Getthatjob.Recruitment
  alias GetthatjobWeb.Resolvers
  alias GetthatjobWeb.Schema.Middleware
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  object :recruitment_queries do
    @desc "Get a Job by id"
    field :job, :job do
      arg(:id, non_null(:integer))
      resolve(&Resolvers.Recruitment.job/3)
    end

    @desc "Get a list of jobs"
    field :jobs, list_of(:job) do
      arg(:limit, :integer)
      arg(:order, type: :sort_order, default_value: :asc)
      arg(:filter, :job_filter)

      resolve(&Resolvers.Recruitment.jobs/3)
    end

    @desc "Get jobs of current recruiter"
    field :jobs_current_recruiter, list_of(:job) do
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.jobs_of_current_recruiter/3)
    end

    @desc "Get applications of current professional"
    field :applications_current_professional, list_of(:application) do
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.applications_of_current_professional/3)
    end

    @desc "application of current professional"
    field :application_current_professional, :application do
      arg(:id, non_null(:integer))
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.application_current_professional/3)
    end

    @desc "Get a Job by id of current recruiter"
    field :job_current_recruiter, :job do
      arg(:id, non_null(:integer))
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.job_of_current_recruiter/3)
    end

    @desc "Get seniorities"
    field :seniorities, list_of(:seniority) do
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.seniorities/3)
    end

    @desc "Get jobs types"
    field :job_types, list_of(:job_type) do
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.job_types/3)
    end

    @desc "Get Cities"
    field :cities, list_of(:city) do
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.cities/3)
    end

    @desc "Get Countries"
    field :countries, list_of(:country) do
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.countries/3)
    end
  end

  object :recruitment_mutations do
    @desc "Create a Job"
    field :create_job, :job do
      arg(:title, non_null(:string))
      arg(:type_id, non_null(:integer))
      arg(:seniority_id, non_null(:integer))
      arg(:salary, :integer)
      arg(:city_id, non_null(:integer))
      arg(:introduction, non_null(:string))
      arg(:expected, non_null(:string))
      arg(:looking_for, non_null(:string))
      arg(:requirements, non_null(:string))

      middleware(Middleware.Authenticate)
      resolve(&Resolvers.Recruitment.create_job/3)
    end

    @desc "Close a job by id of current recruiter "
    field :close_job, :job do
      arg(:id, non_null(:integer))
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.close_job_of_current_recruiter/3)
    end

    @desc "Withdraw a application of current professional"
    field :withdraw_application, :application_id do
      arg(:id, non_null(:integer))
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.withdraw_application_of_current_professional/3)
    end

    @desc "Apply for a job for current Professional"
    field :apply_job, :application do
      arg(:job_id, non_null(:integer))
      arg(:cv_meta, non_null(:upload))
      arg(:professional_experience, non_null(:string))
      arg(:reason, non_null(:string))

      middleware(Middleware.Authenticate)
      resolve(&Resolvers.Recruitment.apply_a_job_of_current_professional/3)
    end

    @desc "edit application of current professional"
    field :edit_application_current_professional, :application do
      arg(:id, non_null(:integer))
      arg(:cv_meta, :upload)
      arg(:professional_experience, non_null(:string))
      arg(:reason, non_null(:string))
      middleware(Middleware.Authenticate)

      resolve(&Resolvers.Recruitment.edit_application_current_professional/3)
    end
  end

  object :job do
    field(:id, non_null(:id))
    field(:title, non_null(:string))
    field(:salary, :integer)
    field(:introduction, non_null(:string))
    field(:expected, non_null(:string))
    field(:looking_for, non_null(:string))
    field(:requirements, non_null(:string))
    field(:inserted_at, non_null(:naive_datetime))
    field(:closed, non_null(:boolean))
    field(:recruiter, non_null(:recruiter), resolve: dataloader(Recruitment))
    field(:applications, list_of(:application), resolve: dataloader(Recruitment))
    field(:city, non_null(:city), resolve: dataloader(Recruitment))
    field(:seniority, non_null(:seniority), resolve: dataloader(Recruitment))
    field(:job_type, non_null(:job_type), resolve: dataloader(Recruitment))
  end

  object :city do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:country, non_null(:country), resolve: dataloader(Recruitment))
  end

  object :country do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:flag_path, non_null(:string))
  end

  object :seniority do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
  end

  object :job_type do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
  end

  object :application do
    field(:id, non_null(:id))
    field(:cv_path, non_null(:string))
    field(:professional_experience, non_null(:string))
    field(:reason, non_null(:string))
    field(:inserted_at, non_null(:naive_datetime))

    field(:professional, :professional, resolve: dataloader(Recruitment))
    field(:job, :job, resolve: dataloader(Recruitment))
  end

  object :professional do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:phone_number, :string)
    field(:description, :string)
    field(:experience, :string)
    field(:linkedin, :string)
    field(:github, :string)
    field(:user, non_null(:user), resolve: dataloader(Recruitment))
  end

  object :recruiter do
    field(:id, non_null(:id))
    field(:company_name, non_null(:string))
    field(:company_logo_path, non_null(:string))
    field(:company_website, non_null(:string))
    field(:company_description, non_null(:string))
  end

  object :application_id do
    field(:id, non_null(:id))
  end

  input_object :job_filter do
    field(:matching, :string)
    field(:country, :string)
    field(:job_type, :string)
    field(:salary_range, :salary_range)
    field(:seniority, :string)
    field(:closed, :boolean)
  end

  input_object :salary_range do
    field(:low, non_null(:integer))
    field(:high, non_null(:integer))
  end

  enum :sort_order do
    value(:asc)
    value(:desc)
  end
end
