defmodule BreadtrackerWeb.RecipeIngredientController do
  use BreadtrackerWeb, :controller

  alias Breadtracker.Recipes
  alias Breadtracker.Recipes.RecipeIngredient

  action_fallback BreadtrackerWeb.FallbackController

  def index(conn, %{"recipe_id" => recipe_id}) do
    recipe_ingredients = Recipes.list_recipe_ingredients(recipe_id)
    render(conn, "index.json", recipe_ingredients: recipe_ingredients)
  end

  def show(conn, %{"recipe_id" => recipe_id, "id" => id}) do
    recipe_ingredient = Recipes.get_recipe_ingredient!(id)
    render(conn, "show.json", recipe_ingredient: recipe_ingredient)
  end

  def create(conn, %{"recipe_id" => recipe_id, "recipe_ingredient" => recipe_ingredient_params}) do
    {recipe_id_int, _} = Integer.parse(recipe_id)
    with {:ok, %RecipeIngredient{} = recipe_ingredient} <-
           Recipes.create_recipe_ingredient(recipe_id_int, recipe_ingredient_params) do
      loaded = Recipes.get_recipe_ingredient!(recipe_ingredient.id)
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.recipe_path(conn, :show, recipe_ingredient))
      |> render("show.json", recipe_ingredient: loaded)
    end
  end

  def update(conn, %{
        "recipe_id" => recipe_id,
        "id" => id,
        "recipe_ingredient" => recipe_ingredient_params
      }) do
    recipe_ingredient = Recipes.get_recipe_ingredient!(id)

    with {:ok, %RecipeIngredient{} = recipe_ingredient} <-
           Recipes.update_recipe_ingredient(recipe_ingredient, recipe_ingredient_params) do
      render(conn, "show.json", recipe_ingredient: recipe_ingredient)
    end
  end

  def delete(conn, %{"recipe_id" => recipe_id, "id" => id}) do
    recipe_ingredient = Recipes.get_recipe_ingredient!(id)

    with {:ok, %RecipeIngredient{}} <- Recipes.delete_recipe_ingredient(recipe_ingredient) do
      send_resp(conn, :no_content, "")
    end
  end
end
