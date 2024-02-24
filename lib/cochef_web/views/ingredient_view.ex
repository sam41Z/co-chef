defmodule CoChefWeb.IngredientView do
  use CoChefWeb, :view
  alias CoChefWeb.IngredientView

  def render("index.json", %{ingredients: ingredients}) do
    %{data: render_many(ingredients, IngredientView, "ingredient.json")}
  end

  def render("show.json", %{ingredient: ingredient}) do
    %{data: render_one(ingredient, IngredientView, "ingredient.json")}
  end

  def render("ingredient.json", %{ingredient: ingredient}) do
    %{
      id: ingredient.id,
      name: ingredient.name,
      energy: ingredient.energy,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      fiber: ingredient.fiber,
      protein: ingredient.protein,
      type: ingredient.type
    }
  end
end
