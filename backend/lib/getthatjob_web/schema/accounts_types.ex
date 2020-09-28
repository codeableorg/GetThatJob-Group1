defmodule GetthatjobWeb.Schema.AccountsTypes do
  use Absinthe.Schema.Notation
  alias Getthatjob.Accounts
  alias Getthatjob.Recruitment.{Professional, Recruiter}
  alias GetthatjobWeb.Resolvers

  alias GetthatjobWeb.Schema.Middleware
  import Absinthe.Resolution.Helpers, only: [dataloader: 2]

  object :accounts_queries do
    @desc "Get the currently signed-in user"
    field :me, :user do
      resolve(&Resolvers.Accounts.me/3)
    end
  end

  object :accounts_mutations do
    @desc "Sign in a user"
    field :sign_in, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      resolve(&Resolvers.Accounts.sign_in/3)
    end

    @desc "Create a professional user account"
    field :sign_up_professional, :session do
      arg(:user, non_null(:user_input))

      resolve(&Resolvers.Accounts.sign_up_professional/3)
    end

    @desc "Create a recruiter user account"
    field :sign_up_recruiter, :session do
      arg(:user, non_null(:user_input))
      arg(:company_name, non_null(:string))
      arg(:company_logo_meta, non_null(:upload))
      arg(:company_website, non_null(:string))
      arg(:company_description, non_null(:string))

      resolve(&Resolvers.Accounts.sign_up_recruiter/3)
    end

    @desc "Edit current professional"
    field :update_current_professional, :professional do
      arg(:name, non_null(:string))
      arg(:phone_number, non_null(:string))
      arg(:description, non_null(:string))
      arg(:experience, non_null(:string))
      arg(:linkedin, :string)
      arg(:github, :string)

      middleware(Middleware.Authenticate)
      resolve(&Resolvers.Accounts.update_current_professional/3)
    end

    @desc "Edit current recruiter"
    field :update_current_recruiter, :recruiter do
      arg(:company_name, non_null(:string))
      arg(:company_logo_meta, :upload)
      arg(:company_website, non_null(:string))
      arg(:company_description, non_null(:string))

      middleware(Middleware.Authenticate)
      resolve(&Resolvers.Accounts.update_current_recruiter/3)
    end

    @desc "Delete current user"
    field :delete_current_user, :user_id do
      middleware(Middleware.Authenticate)
      resolve(&Resolvers.Accounts.delete_user/3)
    end
  end

  object :session do
    field(:user, non_null(:user))
    field(:token, non_null(:string))
  end

  object :user do
    field(:id, non_null(:id))
    field(:type, non_null(:type_user))
    field(:email, non_null(:string))
    field(
      :role_data,
      non_null(:role_data),
      resolve: dataloader(
        Accounts,
        fn
          %{professional_id: nil}, args, _ -> {:recruiter, args}
          _, args, _ -> {:professional, args}
        end
      )
    )
  end

  object :user_id do
    field(:id, non_null(:id))
  end

  union :role_data do
    types [:professional, :recruiter]
    resolve_type fn
      %Professional{}, _ ->
        :professional
      %Recruiter{}, _ ->
        :recruiter
      _, _ -> nil
    end
  end

  input_object :user_input do
    field(:email, non_null(:string))
    field(:password, non_null(:string))
    field(:password_confirmation, non_null(:string))
  end

  enum :type_user do
    value(:recruiter, as: "recruiter")
    value(:professional, as: "professional")
  end
end
