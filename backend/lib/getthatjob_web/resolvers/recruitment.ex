defmodule GetthatjobWeb.Resolvers.Recruitment do
  alias Getthatjob.Recruitment

  def job(_, %{id: id}, _) do
    {:ok, Recruitment.get_job!(id)}
  end

  def jobs(_, args, _) do
    {:ok, Recruitment.list_jobs(args)}
  end
end
