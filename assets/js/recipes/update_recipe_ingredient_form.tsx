import React, { useState, useCallback } from "react";
import { RecipeIngredient, compareIds } from "./recipes_api";
import {
  updateRecipeIngredient as updateRecipeIngredientApi,
  deleteRecipeIngredient,
} from "./recipes_api";
import { debounce } from "../debounce";
import LoadingBar from "../loading_bar";
import { useRecipeIngredients } from "./update_recipe_form";
import Lists from "../lists";

type UpdateRecipeIngredientFormProps = {
  recipeId: number;
  recipeIngredient: RecipeIngredient;
  suffix: string;
  converter: (input: number) => number;
  inverter: (input: number) => number;
  onDelete: (recipeIngredient: RecipeIngredient) => void;
};

const UpdateRecipeIngredientForm = (props: UpdateRecipeIngredientFormProps) => {
  const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>(
    props.recipeIngredient
  );
  const [saving, setSaving] = useState<boolean>(false);
  const [amountValue, setAmountValue] = useState<number>(
    props.inverter(props.recipeIngredient.amount)
  );
  const { recipeIngredients, setRecipeIngredients } = useRecipeIngredients();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const copy = { ...recipeIngredient };
    copy.amount = props.converter(value);
    setRecipeIngredient(copy);
    setAmountValue(value);
    updateRecipeIngredient(copy);
    setRecipeIngredients(Lists.replace(recipeIngredients, copy, compareIds));
  };

  const updateRecipeIngredient = useCallback(
    debounce((recipeIngredient: RecipeIngredient) => {
      setSaving(true);
      updateRecipeIngredientApi(props.recipeId, recipeIngredient)
        .then(() => {
          setSaving(false);
        })
        .catch((error: any) => console.log(error));
    }, 500),
    []
  );

  const handleDelete = (recipeIngredient: RecipeIngredient) => {
    deleteRecipeIngredient(props.recipeId, recipeIngredient.id)
      .then(() => {
        props.onDelete(recipeIngredient);
      })
      .catch((error: any) => console.log(error));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  return (
    <div>
      <form className="recipe-ingredient-form">
        <div className="recipe-ingredient-form-name">
          {recipeIngredient.ingredient.name} ({recipeIngredient.amount}g)
        </div>
        <input
          type="number"
          name="amount"
          onFocus={handleFocus}
          style={{ width: 10 + "em" }}
          value={amountValue}
          onChange={handleAmountChange}
        />
        <div>{props.suffix}</div>
        <a
          className="delete"
          onClick={(_event) => handleDelete(recipeIngredient)}
        >
          🔥
        </a>
      </form>
      <div className="recipe-ingredient-form-loading-bar">
        <LoadingBar loading={saving} />
      </div>
    </div>
  );
};
export default UpdateRecipeIngredientForm;
