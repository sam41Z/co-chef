import React, { useState, useCallback } from "react";
import { Recipe } from "./recipes_api";
import { putRecipe } from "./recipes_api";
import { debounce } from "../debounce";
import LoadingBar from "../loading_bar";

interface UpdateRecipeNameFormProps {
  recipe: Recipe;
  onNameChange: (recipe:Recipe) => void;
}

const UpdateRecipeNameForm = (props: UpdateRecipeNameFormProps) => {
  const [recipe, setRecipe] = useState<Recipe>(props.recipe);
  const [saving, setSaving] = useState<boolean>(false);
  if (recipe.id !== props.recipe.id) {
    setRecipe(props.recipe);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copy = { ...recipe };
    copy.name = event.target.value;
    setRecipe(copy);
    updateRecipe(copy);
  };

  const updateRecipe = useCallback(
    debounce((recipe: Recipe) => {
      setSaving(true);
      putRecipe(recipe)
        .then(() => {
          setSaving(false);
          props.onNameChange(recipe);
        })
        .catch((error: any) => console.log(error));
    }, 500),
    []
  );

  return (
    <div className="recipe-name-form">
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
      </form>
      <LoadingBar loading={saving} />
    </div>
  );
};
export default UpdateRecipeNameForm;
