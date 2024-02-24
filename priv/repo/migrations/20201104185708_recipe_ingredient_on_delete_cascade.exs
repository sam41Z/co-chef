defmodule Breadtracker.Repo.Migrations.RecipeIngredientOnDeleteCascade do
  use Ecto.Migration

  def change do
    drop(constraint(:recipe_ingredients, "recipe_ingredients_recipe_id_fkey"))

    alter table(:recipe_ingredients) do
      modify(:recipe_id, references(:recipes, on_delete: :delete_all))
    end
  end
end
