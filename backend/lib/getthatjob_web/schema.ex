defmodule GetthatjobWeb.Schema do
  use Absinthe.Schema

  alias Getthatjob.Recruitment
  alias Getthatjob.Accounts

  import_types(Absinthe.Type.Custom)
  import_types(Absinthe.Plug.Types)
  import_types(GetthatjobWeb.Schema.AccountsTypes)
  import_types(GetthatjobWeb.Schema.RecruitmentTypes)

  query do
    import_fields :accounts_queries
    import_fields :recruitment_queries
  end

  mutation do
    import_fields :accounts_mutations
    import_fields :recruitment_mutations
  end

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Recruitment, Recruitment.datasource())
      |> Dataloader.add_source(Accounts, Accounts.datasource())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end
end
