defmodule GetthatjobWeb.Router do
  use GetthatjobWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/admin" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: GetthatjobWeb.Telemetry
    end
  end

  scope "/" do
    pipe_through :api

    forward "/api", Absinthe.Plug, schema: GetthatjobWeb.Schema.Schema

    forward "/", Absinthe.Plug.GraphiQL,
      schema: GetthatjobWeb.Schema.Schema,
      socket: GetthatjobWeb.UserSocket,
      interface: :simple
  end
end
