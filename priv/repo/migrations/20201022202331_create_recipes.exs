defmodule Breadtracker.Repo.Migrations.CreateRecipes do
  use Ecto.Migration

  def change do
    create table(:recipes) do
      add :name, :string

      timestamps()
    end
  end
end
