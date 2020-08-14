defmodule GetthatjobWeb.Schema.Schema do
  use Absinthe.Schema

  alias Getthatjob.Recruitment

  alias GetthatjobWeb.Resolvers

  import_types(GetthatjobWeb.Schema.Types)

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
