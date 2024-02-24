import React, { useState, useCallback, SyntheticEvent } from "react";
import { RecipeIngredient } from "./recipes_api";
import { updateRecipeIngredient as updateRecipeIngredientApi } from "./recipes_api";
import { debounce } from "../debounce";
import LoadingBar from "../loading_bar";

interface UpdateRecipeIngredientFormProps {
  recipeId: number;
  recipeIngredient: RecipeIngredient;
}

const UpdateRecipeIngredientForm = (props: UpdateRecipeIngredientFormProps) => {
  const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>(
    props.recipeIngredient
  );
  const [saving, setSaving] = useState<boolean>(false);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copy = { ...recipeIngredient };
    copy.amount = Number(event.target.value);
    setRecipeIngredient(copy);
    updateRecipeIngredient(copy);
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
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
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
          onFocus={handleFocus}
          style={{ width: 10 + "em" }}
          value={recipeIngredient.amount}
          onChange={handleAmountChange}
        />
      </form>
      <div className="recipe-ingredient-form-loading-bar">
        <LoadingBar loading={saving} />
      </div>
    </div>
  );
};
export default UpdateRecipeIngredientForm;
