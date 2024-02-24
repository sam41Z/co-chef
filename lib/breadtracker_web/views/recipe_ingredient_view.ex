defmodule BreadtrackerWeb.RecipeIngredientView do
  use BreadtrackerWeb, :view
  alias BreadtrackerWeb.RecipeIngredientView

  def render("index.json", %{recipe_ingredients: recipe_ingredients}) do
    %{data: render_many(recipe_ingredients, RecipeIngredientView, "recipe_ingredient.json")}
  end

  def render("show.json", %{recipe_ingredient: recipe_ingredient}) do
    %{data: render_one(recipe_ingredient, RecipeIngredientView, "recipe_ingredient.json")}
  end

  def render("recipe_ingredient.json", %{recipe_ingredient: recipe_ingredient}) do
    %{
      id: recipe_ingredient.id,
      amount: recipe_ingredient.amount,
      ingredient: %{
        id: recipe_ingredient.ingredient.id,
        name: recipe_ingredient.ingredient.name,
        type: recipe_ingredient.ingredient.type,
        energy: recipe_ingredient.ingredient.energy,
        carbohydrates: recipe_ingredient.ingredient.carbohydrates,
        fat: recipe_ingredient.ingredient.fat,
        fiber: recipe_ingredient.ingredient.fiber,
        protein: recipe_ingredient.ingredient.protein
      }
    }
  end
end
