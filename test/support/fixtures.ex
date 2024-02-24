defmodule Breadtracker.Fixtures do
  @moduledoc """
  A module for defining fixtures that can be used in tests.
  This module can be used with a list of fixtures to apply as parameter:
      use Breadtracker.Fixtures, [:recipe_ingredient]
  """

  def recipe do
    alias Breadtracker.Recipes

    quote do
      @recipe_valid_attrs %{name: "some name"}
      @recipe_update_attrs %{name: "some updated name"}
      @recipe_invalid_attrs %{name: nil}

      def recipe_fixture(attrs \\ %{}) do
        {:ok, recipe} =
          attrs
          |> Enum.into(@recipe_valid_attrs)
          |> Recipes.create_recipe()

        recipe
      end
    end
  end

  def ingredient do
    alias Breadtracker.Ingredients
    alias Breadtracker.Ingredients.Ingredient

    quote do
      @ingredient_valid_attrs %{name: "some name"}
      @ingredient_update_attrs %{name: "some updated name"}
      @ingredient_invalid_attrs %{name: nil}

      def ingredient_fixture(attrs \\ %{}) do
        {:ok, ingredient} =
          attrs
          |> Enum.into(@ingredient_valid_attrs)
          |> Ingredients.create_ingredient()

        ingredient
      end
    end
  end

  def recipe_ingredient do
    alias Breadtracker.Recipes
    alias Breadtracker.Fixtures
    alias Breadtracker.Repo

    quote do
      @recipe_ingredient_valid_attrs %{amount: 120.5}
      @recipe_ingredient_update_attrs %{amount: 456.7}
      @recipe_ingredient_invalid_attrs %{amount: nil}

      def recipe_ingredient_fixture(attrs \\ %{}) do
        ingredient = ingredient_fixture()
        recipe = recipe_fixture()

        {:ok, recipe_ingredient} =
          attrs
          |> Enum.into(@recipe_ingredient_valid_attrs)
          |> Enum.into(%{ingredient_id: ingredient.id})
          |> (&Recipes.create_recipe_ingredient(recipe.id, &1)).()

        recipe_ingredient
        |> Repo.preload(:ingredient)
      end
    end
  end

  @doc """
  Apply the `fixtures`.
  """
  defmacro __using__(fixtures) when is_list(fixtures) do
    for fixture <- fixtures, is_atom(fixture), do: apply(__MODULE__, fixture, [])
  end
end
