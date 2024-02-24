defmodule CoChefWeb.PageController do
  use CoChefWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
