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
  end

  object :job do
    field(:id, non_null(:id))
    field(:type, :string)
    field(:seniority, :boolean)
    field(:salary, :integer)
    field(:location, :string)
    field(:introduction, :string)
    field(:expected, :string)
    field(:looking_for, :string)
    field(:requirements, :string)
  end
end
