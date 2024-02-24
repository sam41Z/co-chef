defmodule BreadtrackerWeb.RecipeIngredientView do
  use BreadtrackerWeb, :view
  alias BreadtrackerWeb.RecipeIngredientView

  def render("index.json", %{recipe_ingrediens: recipe_ingredients}) do
    %{data: render_many(recipe_ingredients, RecipeIngredientView, "recipe_ingredient.json")}
  end

  def render("show.json", %{recipe_ingredient: recipe_ingredient}) do
    %{data: render_one(recipe_ingredient, RecipeIngredientView, "recipe_ingredient.json")}
  end

  def render("recipe_ingredient.json", %{recipe_ingredient: recipe_ingredient}) do
    %{id: recipe_ingredient.id, name: recipe_ingredient.name}
  end
end
