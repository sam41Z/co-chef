defmodule BreadtrackerWeb.IngredientController do
  use BreadtrackerWeb, :controller

  alias Breadtracker.Ingredients
  alias Breadtracker.Ingredients.Ingredient

  action_fallback BreadtrackerWeb.FallbackController

  def index(conn, _params) do
    ingredients = Ingredients.list_ingredients()
    render(conn, "index.json", ingredients: ingredients)
  end

  def show(conn, %{"id" => id}) do 
    ingredient = Ingredients.get_ingredient!(id)
    render("show.json", ingredient: ingredient)
  end

  def create(conn, %{"ingredient" => ingredient_params}) do
    with {:ok, %Ingredient{} = ingredient} <- Ingredients.create_ingredient(ingredient_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.ingredient_path(conn, :show, ingredient))
      |> render("show.json", ingredient: ingredient)
    end
  end

  def update(conn, %{"id" => id, "ingredient" => ingredient_params}) do
    ingredient = Ingredients.get_ingredient!(id)

    with {:ok, %Ingredient{} = ingredient} <- Ingredients.update_ingredient(ingredient, ingredient_params) do
      render(conn, "show.json", ingredient: ingredient)
    end
  end

  def delete(conn, %{"id" => id}) do
    ingredient = Ingredients.get_ingredient!(id)

    with {:ok, %Ingredient{}} <- Ingredients.delete_ingredient(ingredient) do
      send_resp(conn, :no_content, "")
    end
  end
end
