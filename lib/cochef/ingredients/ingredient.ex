defmodule CoChef.Ingredients.Ingredient do
  use Ecto.Schema
  import Ecto.Changeset

  schema "ingredients" do
    field :name, :string
    field :energy, :float
    field :fat, :float
    field :carbohydrates, :float
    field :fiber, :float
    field :protein, :float
    field :type, :string
    timestamps()
  end

  @doc false
  def changeset(ingredient, attrs) do
    ingredient
    |> cast(attrs, [:name, :energy, :fat, :carbohydrates, :fiber, :protein, :type])
    |> validate_required([:name, :energy, :fat, :carbohydrates, :fiber, :protein])
  end
end
