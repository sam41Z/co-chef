defmodule CoChefWeb.Router do
  use CoChefWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", CoChefWeb do
    pipe_through :api

    resources "/ingredients", IngredientController,
      only: [:index, :create, :update, :show, :delete]

    resources "/recipes", RecipeController, only: [:index, :create, :update, :show, :delete] do
      resources "/ingredients", RecipeIngredientController,
        only: [:index, :create, :update, :show, :delete]

      post "/copy", RecipeController, :copy
    end
  end

  scope "/", CoChefWeb do
    pipe_through :browser

    get "/*path", PageController, :index
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

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: CoChefWeb.Telemetry
    end
  end
end
