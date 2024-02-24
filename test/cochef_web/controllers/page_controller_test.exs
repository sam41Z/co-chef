defmodule CoChefWeb.PageControllerTest do
  use CoChefWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "CoChef"
  end
end
