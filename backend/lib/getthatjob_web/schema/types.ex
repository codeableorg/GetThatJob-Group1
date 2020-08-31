defmodule GetthatjobWeb.Schema.Types do
  use Absinthe.Schema.Notation
  alias Getthatjob.Recruitment

  import_types(Absinthe.Type.Custom)
  import_types(Absinthe.Plug.Types)

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

    field(:professional, :professional, resolve: dataloader(Recruitment))
  end

  object :professional do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:phone_number, :string)
    field(:description, :string)
    field(:experience, :string)
    field(:linkedin, :string)
    field(:github, :string)
  end

  object :recruiter do
    field(:id, non_null(:id))
    field(:company_name, non_null(:string))
    field(:company_logo_path, non_null(:string))
    field(:company_website, non_null(:string))
    field(:company_description, non_null(:string))
  end

  object :session do
    field(:user, non_null(:user))
    field(:token, non_null(:string))
  end

  object :user do
    field(:id, non_null(:id))
    field(:type, non_null(:type_user))
    field(:email, non_null(:string))
    field(:professional, :professional, resolve: dataloader(Recruitment))
    field(:recruiter, :recruiter, resolve: dataloader(Recruitment))
  end

  object :user_id do
    field(:id, non_null(:id))
  end

  input_object :user_input do
    field(:email, non_null(:string))
    field(:password, non_null(:string))
    field(:password_confirmation, non_null(:string))
  end

  input_object :job_filter do
    field(:matching, :string)
    field(:country, :string)
    field(:job_type, :string)
    field(:salary_range, :salary_range)
    field(:seniority, :string)
  end

  input_object :salary_range do
    field(:low, non_null(:integer))
    field(:high, non_null(:integer))
  end

  enum :type_user do
    value(:recruiter, as: "recruiter")
    value(:professional, as: "professional")
  end

  enum :sort_order do
    value(:asc)
    value(:desc)
  end
end
