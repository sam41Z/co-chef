defmodule Breadtracker.Repo.Migrations.AddIngredientsFields do
  use Ecto.Migration

  def change do
    alter table(:ingredients) do
      add(:energy, :float)
      add(:fat, :float)
      add(:carbohydrates, :float)
      add(:fiber, :float)
      add(:protein, :float)
      add(:type, :string)
    end
  end
end
