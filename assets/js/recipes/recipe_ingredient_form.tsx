import React, { useState, useEffect, SyntheticEvent } from "react";
import { RecipeIngredient, RecipeIngredientNew } from "./recipes_api";
import {
  saveRecipeIngredient as saveRecipeIngredientApi,
  updateRecipeIngredient as updateRecipeIngredientApi,
} from "./recipes_api";
import { Ingredient, getIngredients } from "../ingredients/ingredients_api";

interface RecipeIngredientFormProps {
  recipeId: number;
  recipeIngredient?: RecipeIngredient;
  setRecipeIngredient: { (ingredient: RecipeIngredient): any };
}

const RecipeIngredientForm = (props: RecipeIngredientFormProps) => {
  const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>();
  const [amount, setAmount] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  if (props.recipeIngredient && !recipeIngredient) {
    setRecipeIngredient(props.recipeIngredient);
    setAmount(props.recipeIngredient.amount);
    setIngredient(props.recipeIngredient.ingredient);
  }
  useEffect(() => {
    getIngredients()
      .then((response: Ingredient[]) => {
        setIngredients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (recipeIngredient) {
      updateRecipeIngredient(recipeIngredient);
    } else if (ingredient) {
      saveRecipeIngredient({ amount: amount, ingredient_id: ingredient.id });
      setIngredient(undefined);
      setAmount(0);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id: number = Number(event.target.value);
    const selected: Ingredient | undefined = ingredients.find(
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

  const updateRecipeIngredient = (recipeIngredient: RecipeIngredient) => {
    updateRecipeIngredientApi(
      props.recipeId,
      recipeIngredient
    ).catch((error: any) => console.log(error));
  };

  if (!ingredient && ingredients && ingredients.length > 0) {
    setIngredient(ingredients[0]);
  }
  const options = ingredients.map((ingredient) => (
    <option
      key={ingredient.id}
      value={ingredient.id}
      selected={
        recipeIngredient && recipeIngredient.ingredient.id == ingredient.id
      }
    >
      {ingredient.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit} className="recipe-ingredient-form">
      <select
        name="ingredient"
        onChange={handleIngredientChange}
        disabled={recipeIngredient ? true : false}
      >
        {options}
      </select>
      <input
        type="number"
        name="amount"
        style={{ width: 10 + "em" }}
        value={amount}
        onChange={handleAmountChange}
      />
      <input type="submit" value={recipeIngredient ? "Update" : "Add"} />
    </form>
  );
};
export default RecipeIngredientForm;
