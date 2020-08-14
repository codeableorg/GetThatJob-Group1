defmodule GetthatjobWeb.Schema.Schema do
  use Absinthe.Schema

  alias Getthatjob.Recruitment

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  alias GetthatjobWeb.Resolvers

  query do
    @desc "Get a Job by title"

    field :job, :job do
      arg(:title, non_null(:string))

      resolve(&Resolvers.Recruitment.job/3)
    end

    @desc "Get a list of jobs"
    field :jobs, list_of(:job) do
      arg(:limit, :integer)
      arg(:order, type: :sort_order, default_value: :asc)
      arg(:filter, :job_filter)

      resolve(&Resolvers.Recruitment.jobs/3)
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

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Recruitment, Recruitment.datasource())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end
end
