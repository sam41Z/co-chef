defmodule Breadtracker.RecipesTest do
  use Breadtracker.DataCase

  alias Breadtracker.Recipes

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
  
  describe "recipes" do
    alias Breadtracker.Recipes.Recipe

   test "list_recipes/0 returns all recipes" do
      recipe = recipe_fixture()
      assert Recipes.list_recipes() == [recipe]
    end

    test "get_recipe!/1 returns the recipe with given id" do
      recipe = recipe_fixture()
      assert Recipes.get_recipe!(recipe.id) == recipe
    end

    test "create_recipe/1 with valid data creates a recipe" do
      assert {:ok, %Recipe{} = recipe} = Recipes.create_recipe(@recipe_valid_attrs)
      assert recipe.name == "some name"
    end

    test "create_recipe/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recipes.create_recipe(@recipe_invalid_attrs)
    end

    test "update_recipe/2 with valid data updates the recipe" do
      recipe = recipe_fixture()
      assert {:ok, %Recipe{} = recipe} = Recipes.update_recipe(recipe, @recipe_update_attrs)
      assert recipe.name == "some updated name"
    end

    test "update_recipe/2 with invalid data returns error changeset" do
      recipe = recipe_fixture()
      assert {:error, %Ecto.Changeset{}} = Recipes.update_recipe(recipe, @recipe_invalid_attrs)
      assert recipe == Recipes.get_recipe!(recipe.id)
    end

    test "delete_recipe/1 deletes the recipe" do
      recipe = recipe_fixture()
      assert {:ok, %Recipe{}} = Recipes.delete_recipe(recipe)
      assert_raise Ecto.NoResultsError, fn -> Recipes.get_recipe!(recipe.id) end
    end

    test "change_recipe/1 returns a recipe changeset" do
      recipe = recipe_fixture()
      assert %Ecto.Changeset{} = Recipes.change_recipe(recipe)
    end
  end

  describe "recipe_ingredients" do
    alias Breadtracker.Recipes.RecipeIngredient
    alias Breadtracker.IngredientsTest

    @valid_attrs %{amount: 120.5}
    @update_attrs %{amount: 456.7}
    @invalid_attrs %{amount: nil}

    def recipe_ingredient_fixture(attrs \\ %{}) do
      ingredient = IngredientsTest.ingredient_fixture()
      recipe = recipe_fixture()
      {:ok, recipe_ingredient} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Enum.into(%{ingredient_id: ingredient.id})
        |> (&(Recipes.create_recipe_ingredient(recipe.id, &1))).()

      recipe_ingredient
      |> Repo.preload(:ingredient)
    end

    test "list_recipe_ingredients/0 returns all recipe_ingredients" do
      recipe_ingredient = recipe_ingredient_fixture()
      assert Recipes.list_recipe_ingredients(recipe_ingredient.recipe_id)  == [recipe_ingredient]
    end

    test "get_recipe_ingredient!/1 returns the recipe_ingredient with given id" do
      recipe_ingredient = recipe_ingredient_fixture()
      assert Recipes.get_recipe_ingredient!(recipe_ingredient.id) == recipe_ingredient
    end

    test "create_recipe_ingredient/1 with valid data creates a recipe_ingredient" do

      ingredient = IngredientsTest.ingredient_fixture()
      recipe = recipe_fixture()
      ingredient_attr = %{ ingredient_id: ingredient.id}
      recipe_ingredient = Enum.into(@valid_attrs, ingredient_attr)
      assert {:ok, %RecipeIngredient{} = recipe_ingredient} = Recipes.create_recipe_ingredient(recipe.id, recipe_ingredient)
      assert recipe_ingredient.amount == 120.5
    end

    test "create_recipe_ingredient/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recipes.create_recipe_ingredient(@invalid_attrs)
    end

    test "update_recipe_ingredient/2 with valid data updates the recipe_ingredient" do
      recipe_ingredient = recipe_ingredient_fixture()
      assert {:ok, %RecipeIngredient{} = recipe_ingredient} = Recipes.update_recipe_ingredient(recipe_ingredient, @update_attrs)
      assert recipe_ingredient.amount == 456.7
    end

    test "update_recipe_ingredient/2 with invalid data returns error changeset" do
      recipe_ingredient = recipe_ingredient_fixture()
      assert {:error, %Ecto.Changeset{}} = Recipes.update_recipe_ingredient(recipe_ingredient, @invalid_attrs)
      assert recipe_ingredient == Recipes.get_recipe_ingredient!(recipe_ingredient.id)
    end

    test "delete_recipe_ingredient/1 deletes the recipe_ingredient" do
      recipe_ingredient = recipe_ingredient_fixture()
      assert {:ok, %RecipeIngredient{}} = Recipes.delete_recipe_ingredient(recipe_ingredient)
      assert_raise Ecto.NoResultsError, fn -> Recipes.get_recipe_ingredient!(recipe_ingredient.id) end
    end

    test "change_recipe_ingredient/1 returns a recipe_ingredient changeset" do
      recipe_ingredient = recipe_ingredient_fixture()
      assert %Ecto.Changeset{} = Recipes.change_recipe_ingredient(recipe_ingredient)
    end
  end
end
