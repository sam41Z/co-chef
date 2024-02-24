defmodule BreadtrackerWeb.PageControllerTest do
  use BreadtrackerWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Phoenix"
  end
end
