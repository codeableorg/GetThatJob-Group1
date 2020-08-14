defmodule GetthatjobWeb.Resolvers.Recruitment do
  alias Getthatjob.Recruitment

  def job(_, %{title: title}, _) do
    {:ok, Recruitment.get_job_by_title!(title)}
  end

  def jobs(_, args, _) do
    {:ok, Recruitment.list_jobs(args)}
  end
end
