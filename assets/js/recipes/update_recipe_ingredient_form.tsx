import React, { useState, useCallback } from "react";
import { RecipeIngredient } from "./recipes_api";
import {
  updateRecipeIngredient as updateRecipeIngredientApi,
  deleteRecipeIngredient,
} from "./recipes_api";
import { debounce } from "../debounce";
import LoadingBar from "../loading_bar";
import ConvertableInput from "../convertable_input";

type UpdateRecipeIngredientFormProps = {
  recipeId: number;
  recipeIngredient: RecipeIngredient;
  altUnit?: {
    suffix: string;
    convert: (input: number) => number;
    invert: (input: number) => number;
  };
  onChange: (recipeIngredient: RecipeIngredient) => void;
  onDelete: (recipeIngredient: RecipeIngredient) => void;
};

const UpdateRecipeIngredientForm = (props: UpdateRecipeIngredientFormProps) => {
  // State
  const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>(
    props.recipeIngredient
  );
  const [saving, setSaving] = useState<boolean>(false);

  const onAmountChange = (amount: number) => {
    const copy = { ...recipeIngredient };
    copy.amount = amount;
    setRecipeIngredient(copy);
    updateRecipeIngredient(copy);
    props.onChange(copy);
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

  return (
    <div>
      <form className="recipe-ingredient-form">
        <div className="recipe-ingredient-form-name">
          {recipeIngredient.ingredient.name}
        </div>
        <ConvertableInput
          value={recipeIngredient.amount}
          altUnit={props.altUnit}
          onChange={onAmountChange}
        />
        <a
          className="delete"
          title="delete"
          onClick={(_event) => onDelete(recipeIngredient)}
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
