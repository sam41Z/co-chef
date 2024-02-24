defmodule Breadtracker.Repo.Migrations.CreateRecipeIngredients do
  use Ecto.Migration

  def change do
    create table(:recipe_ingredients) do
      add :amount, :float
      add :recipe, references(:recipes, on_delete: :nothing)
      add :ingredient, references(:ingredients, on_delete: :nothing)

      timestamps()
    end

    create index(:recipe_ingredients, [:recipe])
    create index(:recipe_ingredients, [:ingredient])
  end
end
