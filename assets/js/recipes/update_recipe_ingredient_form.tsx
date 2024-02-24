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
  const [amountValue, setAmountValue] = useState<string>(
    String(props.inverter(props.recipeIngredient.amount))
  );
  const [actualAmountValue, setActualAmountValue] = useState<string>(
    String(props.recipeIngredient.amount)
  );
  const { recipeIngredients, setRecipeIngredients } = useRecipeIngredients();

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const actualAmount = props.converter(Number(value));
    setAmountValue(value);
    setActualAmountValue(String(actualAmount));
    updateAmount(actualAmount);
  };

  const onActualAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const amount = Number(value);
    setAmountValue(String(props.inverter(amount)));
    setActualAmountValue(value);
    updateAmount(amount);
  };

  const updateAmount = (amount: number) => {
    const copy = { ...recipeIngredient };
    copy.amount = amount;
    setRecipeIngredient(copy);
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
    }, 1000),
    []
  );

  const onDelete = (recipeIngredient: RecipeIngredient) => {
    deleteRecipeIngredient(props.recipeId, recipeIngredient.id)
      .then(() => {
        props.onDelete(recipeIngredient);
      })
      .catch((error: any) => console.log(error));
  };

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  return (
    <div>
      <form className="recipe-ingredient-form">
        <div className="recipe-ingredient-form-name">
          {recipeIngredient.ingredient.name}
        </div>
        <input
          type="number"
          name="amount"
          onFocus={onFocus}
          style={{ width: 2.5 + "rem" }}
          value={actualAmountValue}
          onChange={onActualAmountChange}
        />
        <div>g</div>
        <input
          type="number"
          name="amount"
          onFocus={onFocus}
          style={{ width: 2.5 + "rem" }}
          value={amountValue}
          onChange={onAmountChange}
        />
        <div>{props.suffix}</div>
        <a className="delete" onClick={(_event) => onDelete(recipeIngredient)}>
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
