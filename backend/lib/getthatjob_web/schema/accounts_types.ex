defmodule GetthatjobWeb.Schema.AccountsTypes do
  use Absinthe.Schema.Notation
  alias Getthatjob.Recruitment

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

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

  enum :type_user do
    value(:recruiter, as: "recruiter")
    value(:professional, as: "professional")
  end
end
