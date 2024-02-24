defmodule Breadtracker.IngredientsTest do
  use Breadtracker.DataCase

  alias Breadtracker.Ingredients

  describe "ingredients" do
    alias Breadtracker.Ingredients.Ingredient
    use Breadtracker.Fixtures, [:ingredient]

    test "list_ingredients/0 returns all ingredients" do
      ingredient = ingredient_fixture()
      assert Ingredients.list_ingredients() == [ingredient]
    end

    test "get_ingredient!/1 returns the ingredient with given id" do
      ingredient = ingredient_fixture()
      assert Ingredients.get_ingredient!(ingredient.id) == ingredient
    end

    test "create_ingredient/1 with valid data creates a ingredient" do
      assert {:ok, %Ingredient{} = ingredient} =
               Ingredients.create_ingredient(@ingredient_valid_attrs)
    end

    test "create_ingredient/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} =
               Ingredients.create_ingredient(@ingredient_invalid_attrs)
    end

    test "update_ingredient/2 with valid data updates the ingredient" do
      ingredient = ingredient_fixture()

      assert {:ok, %Ingredient{} = ingredient} =
               Ingredients.update_ingredient(ingredient, @ingredient_update_attrs)
    end

    test "update_ingredient/2 with invalid data returns error changeset" do
      ingredient = ingredient_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Ingredients.update_ingredient(ingredient, @ingredient_invalid_attrs)

      assert ingredient == Ingredients.get_ingredient!(ingredient.id)
    end

    test "delete_ingredient/1 deletes the ingredient" do
      ingredient = ingredient_fixture()
      assert {:ok, %Ingredient{}} = Ingredients.delete_ingredient(ingredient)
      assert_raise Ecto.NoResultsError, fn -> Ingredients.get_ingredient!(ingredient.id) end
    end

    test "change_ingredient/1 returns a ingredient changeset" do
      ingredient = ingredient_fixture()
      assert %Ecto.Changeset{} = Ingredients.change_ingredient(ingredient)
    end
  end
end
