defmodule GetthatjobWeb.Schema.Schema do
  use Absinthe.Schema
  alias Getthatjob.{Account, Recruitment}

  query do
    @desc "Get a Job by title"

    field :job, :job do
      arg(:title, non_null(:string))

      resolve(fn _, %{title: title}, _ ->
        {:ok, Recruitment.get_job_by_title!(title)}
      end)
    end

    @desc "Get a list of jobs"
    field :jobs, list_of(:job) do
      arg(:limit, :integer)
      arg(:order, type: :sort_order, default_value: :asc)
      arg(:filter, :job_filter)

      resolve(fn _, args, _ ->
        {:ok, Recruitment.list_jobs(args)}
      end)
    end
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

  object :job do
    field(:id, non_null(:id))
    field(:title, non_null(:string))
    field(:type, non_null(:string))
    field(:seniority, non_null(:boolean))
    field(:salary, :integer)
    field(:location, non_null(:string))
    field(:introduction, non_null(:string))
    field(:expected, non_null(:string))
    field(:looking_for, non_null(:string))
    field(:requirements, non_null(:string))
  end
end
