defmodule CoChefWeb.IngredientControllerTest do
  use CoChefWeb.ConnCase

  alias CoChef.Ingredients
  alias CoChef.Ingredients.Ingredient

  @create_attrs %{
    name: "some name",
    energy: 1454.1,
    fat: 1.9,
    carbohydrates: 53,
    fiber: 5.2,
    protein: 7.6,
    type: "flour"
  }
  @update_attrs %{
    name: "some updated name",
    energy: 454.1,
    fat: 0.9,
    carbohydrates: 56,
    fiber: 5.0,
    protein: 7.7,
    type: "flour"
  }
  @invalid_attrs %{name: nil}

  def fixture(:ingredient) do
    {:ok, ingredient} = Ingredients.create_ingredient(@create_attrs)
    ingredient
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all ingredients", %{conn: conn} do
      conn = get(conn, Routes.ingredient_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ingredient" do
    test "renders ingredient when data is valid", %{conn: conn} do
      conn = post(conn, Routes.ingredient_path(conn, :create), ingredient: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.ingredient_path(conn, :show, id))

      expected = %{
        "id" => id,
        "name" => "some name",
        "energy" => 1454.1,
        "fat" => 1.9,
        "carbohydrates" => 53.0,
        "fiber" => 5.2,
        "protein" => 7.6,
        "type" => "flour"
      }

      assert ^expected = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.ingredient_path(conn, :create), ingredient: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ingredient" do
    setup [:create_ingredient]

    test "renders ingredient when data is valid", %{
      conn: conn,
      ingredient: %Ingredient{id: id} = ingredient
    } do
      conn =
        put(conn, Routes.ingredient_path(conn, :update, ingredient), ingredient: @update_attrs)

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.ingredient_path(conn, :show, id))

      name = "some updated name"

      assert %{
               "id" => ^id,
               "name" => ^name
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, ingredient: ingredient} do
      conn =
        put(conn, Routes.ingredient_path(conn, :update, ingredient), ingredient: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ingredient" do
    setup [:create_ingredient]

    test "deletes chosen ingredient", %{conn: conn, ingredient: ingredient} do
      conn = delete(conn, Routes.ingredient_path(conn, :delete, ingredient))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.ingredient_path(conn, :show, ingredient))
      end
    end
  end

  defp create_ingredient(_) do
    ingredient = fixture(:ingredient)
    %{ingredient: ingredient}
  end
end
