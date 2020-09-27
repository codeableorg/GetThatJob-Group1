defmodule GetthatjobWeb.Schema.RecruitmentTypes do
  use Absinthe.Schema.Notation
  alias Getthatjob.Recruitment

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

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
