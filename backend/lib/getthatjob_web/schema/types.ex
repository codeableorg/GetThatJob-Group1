defmodule GetthatjobWeb.Schema.Types do
  use Absinthe.Schema.Notation
  alias Getthatjob.Recruitment

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  object :job do
    field :id, non_null(:id)
    field :title, non_null(:string)
    field :type, non_null(:string)
    field :seniority, non_null(:boolean)
    field :salary, :integer
    field :location, non_null(:string)
    field :introduction, non_null(:string)
    field :expected, non_null(:string)
    field :looking_for, non_null(:string)
    field :requirements, non_null(:string)
    field :applications, list_of(:application), resolve: dataloader(Recruitment)
  end

  object :application do
    field :id, non_null(:id)
    field :cv_path, non_null(:string)
    field :professional_experience, non_null(:string)
    field :reason, non_null(:string)

    field :professional, :professional, resolve: dataloader(Recruitment)
  end

  object :professional do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :phone_number, non_null(:string)
    field :description, non_null(:string)
    field :experience, non_null(:string)
    field :linkedin, :string
    field :github, :string
  end

  input_object :job_filter do
    field :matching, :string
    field :country, :string
    field :type, :string
    field :salary_range, :salary_range
    field :seniority, :string
  end

  input_object :salary_range do
    field :low, non_null(:integer)
    field :high, non_null(:integer)
  end

  enum :sort_order do
    value(:asc)
    value(:desc)
  end
end
