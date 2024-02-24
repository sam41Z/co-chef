defmodule BreadtrackerWeb.RecipeIngredientControllerTest do
  use BreadtrackerWeb.ConnCase

  use Breadtracker.Fixtures, [:ingredient, :recipe, :recipe_ingredient]
  
  alias Breadtracker.Recipes.RecipeIngredient

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  defp create_recipe_ingredient(_) do
    recipe_ingredient = recipe_ingredient_fixture()
    %{recipe_ingredient: recipe_ingredient}
  end

  describe "index" do
    setup [:create_recipe_ingredient]

    test "lists all recipe_ingredients", %{
      conn: conn,
      recipe_ingredient: %RecipeIngredient{recipe_id: recipe_id} 
    } do
      conn = get(conn, Routes.recipe_recipe_ingredient_path(conn, :index, recipe_id))
      data = json_response(conn, 200)["data"]
      assert length(data) == 1
    end
  end

  describe "create recipe_ingredient" do
    test "renders recipe_ingredient when data is valid", %{conn: conn} do
      recipe = recipe_fixture()
      ingredient = ingredient_fixture()
      attrs = Enum.into(@recipe_ingredient_valid_attrs, %{ingredient_id: ingredient.id })
      conn =
        post(conn, Routes.recipe_recipe_ingredient_path(conn, :create, recipe.id),
          recipe_ingredient: attrs)

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.recipe_recipe_ingredient_path(conn, :show,recipe.id, id))

      assert %{
               "id" => id,
               "amount" => 120.5
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      recipe = recipe_fixture()
      conn =
        post(conn, Routes.recipe_recipe_ingredient_path(conn, :create, recipe.id),
          recipe_ingredient: @recipe_ingredient_invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update recipe_ingredient" do
    setup [:create_recipe_ingredient]

    test "renders recipe_ingredient when data is valid", %{
      conn: conn,
      recipe_ingredient: %RecipeIngredient{id: id, recipe_id: recipe_id}
    } do
      conn =
        put(conn, Routes.recipe_recipe_ingredient_path(conn, :update, recipe_id, id),
          recipe_ingredient: @recipe_ingredient_update_attrs
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.recipe_recipe_ingredient_path(conn, :show, recipe_id, id))

      assert %{
               "id" => id,
               "amount" => 456.7
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{
      conn: conn,
      recipe_ingredient: %RecipeIngredient{id: id, recipe_id: recipe_id}
    } do
      conn =
        put(conn, Routes.recipe_recipe_ingredient_path(conn, :update, recipe_id, id),
          recipe_ingredient: @recipe_ingredient_invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete recipe_ingredient" do
    setup [:create_recipe_ingredient]

    test "deletes chosen recipe_ingredient", %{conn: conn, recipe_ingredient: recipe_ingredient} do
      conn = delete(conn, Routes.recipe_recipe_ingredient_path(conn, :delete, recipe_ingredient.recipe_id, recipe_ingredient.id))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.recipe_recipe_ingredient_path(conn, :show, recipe_ingredient.recipe_id, recipe_ingredient.id))
      end
    end
  end
end
