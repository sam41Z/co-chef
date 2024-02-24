defmodule CoChefWeb.RecipeController do
  use CoChefWeb, :controller

  alias CoChef.Recipes
  alias CoChef.Recipes.Recipe

  action_fallback CoChefWeb.FallbackController

  def index(conn, _params) do
    recipes = Recipes.list_recipes()
    render(conn, "index.json", recipes: recipes)
  end

  def show(conn, %{"id" => id}) do
    recipe = Recipes.get_recipe!(id)
    render(conn, "show.json", recipe: recipe)
  end

  def create(conn, %{"recipe" => recipe_params}) do
    with {:ok, %Recipe{} = recipe} <- Recipes.create_recipe(recipe_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.recipe_path(conn, :show, recipe))
      |> render("show.json", recipe: recipe)
    end
  end

  def copy(conn, %{"recipe_id" => id}) do
    with {:ok, %Recipe{} = recipe} <- Recipes.copy_recipe(id) do
      render(conn, "show.json", recipe: recipe)
    end
  end

  def update(conn, %{"id" => id, "recipe" => recipe_params}) do
    recipe = Recipes.get_recipe!(id)

    with {:ok, %Recipe{} = recipe} <- Recipes.update_recipe(recipe, recipe_params) do
      render(conn, "show.json", recipe: recipe)
    end
  end

  def delete(conn, %{"id" => id}) do
    recipe = Recipes.get_recipe!(id)

    with {:ok, %Recipe{}} <- Recipes.delete_recipe(recipe) do
      send_resp(conn, :no_content, "")
    end
  end
end
