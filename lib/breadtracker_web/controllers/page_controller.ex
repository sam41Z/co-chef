defmodule BreadtrackerWeb.PageController do
  use BreadtrackerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
