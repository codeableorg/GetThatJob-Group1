defmodule GetthatjobWeb.Schema.Schema do
  use Absinthe.Schema

  alias Getthatjob.Recruitment

  alias GetthatjobWeb.Resolvers
  alias GetthatjobWeb.Schema.Middleware

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

    @desc "Get the currently signed-in user"
    field :me, :user do
      middleware(Middleware.Authenticate)
      resolve(&Resolvers.Accounts.me/3)
    end
  end

  mutation do
    @desc "Sign in a user"
    field :signin, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      resolve(&Resolvers.Accounts.signin/3)
    end

    @desc "Create a professional user account"
    field :signup_professional, :session do
      arg(:user, non_null(:user_input))

      resolve(&Resolvers.Accounts.signup_professional/3)
    end

    @desc "Create a recruiter user account"
    field :signup_recruiter, :session do
      arg(:user, non_null(:user_input))
      arg(:company_name, non_null(:string))
      arg(:company_logo_path, non_null(:string))
      arg(:company_website, non_null(:string))
      arg(:company_description, non_null(:string))

      resolve(&Resolvers.Accounts.signup_recruiter/3)
    end

    @desc "Test for file upload"
    field :upload_file, :string do
      arg(:file_data, non_null(:upload))

      resolve(fn args, _ ->
        # this is a `%Plug.Upload{}` struct.
        IO.inspect(args.file_data)

        {:ok, "success"}
      end)
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
