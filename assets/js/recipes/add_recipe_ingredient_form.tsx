import React, { useState, SyntheticEvent } from "react";
import { RecipeIngredient, RecipeIngredientNew } from "./recipes_api";
import { saveRecipeIngredient as saveRecipeIngredientApi } from "./recipes_api";
import { Ingredient } from "../ingredients/ingredients_api";

interface NewRecipeIngredientFormProps {
  recipeId: number;
  ingredients: Ingredient[];
  setRecipeIngredient: { (ingredient: RecipeIngredient): any };
}

const AddRecipeIngredientForm = (props: NewRecipeIngredientFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient>();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (ingredient)
      saveRecipeIngredient({ amount: amount, ingredient_id: ingredient.id });
    setIngredient(undefined);
    setAmount(0);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id: number = Number(event.target.value);
    const selected: Ingredient | undefined = props.ingredients.find(
      (item) => item.id === id
    );
    if (selected) setIngredient(selected);
  };

  const saveRecipeIngredient = (recipeIngredient: RecipeIngredientNew) => {
    saveRecipeIngredientApi(props.recipeId, recipeIngredient)
      .then((response: RecipeIngredient) => {
        props.setRecipeIngredient(response);
      })
      .catch((error: any) => console.log(error));
  };

  const options = props.ingredients.map((ingredient) => (
    <option key={ingredient.id} value={ingredient.id}>
      {ingredient.name}
    </option>
  ));

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  return (
    <form onSubmit={handleSubmit} className="recipe-ingredient-form">
      <select
        name="ingredient"
        className="recipe-ingredient-form-name"
        onChange={handleIngredientChange}
      >
        <option> - choose ingredient</option>
        {options}
      </select>
      <input
        type="number"
        name="amount"
        style={{ width: 10 + "em" }}
        value={amount}
        onChange={handleAmountChange}
        onFocus={handleFocus}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
export default AddRecipeIngredientForm;
