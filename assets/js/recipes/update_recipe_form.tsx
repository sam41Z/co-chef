import React, { useState, useEffect } from "react";
import { Recipe, RecipeIngredient } from "./recipes_api";
import { getRecipeIngredients } from "./recipes_api";
import UpdateRecipeIngredientForm from "./update_recipe_ingredient_form";
import UpdateRecipeNameForm from "./update_recipe_name_form";
import AddRecipeIngredientForm from "./add_recipe_ingredient_form";

interface UpdateRecipeFormProps {
  recipe: Recipe;
  onUpdateDone: (recipe: Recipe) => void;
}

const UpdateRecipeForm = (props: UpdateRecipeFormProps) => {
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  useEffect(() => {
    fetchRecipeIngredients(props.recipe.id);
  }, []);

  const fetchRecipeIngredients = (id: number) => {
    getRecipeIngredients(id)
      .then((response: RecipeIngredient[]) => {
        setRecipeIngredients(response);
      })
      .catch((error) => console.log(error));
  };

  const onDone = () => {
    props.onUpdateDone(props.recipe);
  };

  const onDeleteRecipeIngredient = (
    deletedRecipeIngredient: RecipeIngredient
  ) => {
    const index = recipeIngredients.findIndex(
      (recipeIngredient) => recipeIngredient.id === deletedRecipeIngredient.id
    );
    const copy = [...recipeIngredients];
    copy.splice(index, 1);
    setRecipeIngredients(copy);
  };

  const recipeIngredientList =
    recipeIngredients.length > 0 ? (
      recipeIngredients.map((item) => (
        <UpdateRecipeIngredientForm
          key={item.id}
          recipeId={props.recipe.id}
          recipeIngredient={item}
          onDelete={onDeleteRecipeIngredient}
        />
      ))
    ) : (
      <div className="recipe-form-no-ingredients">No ingredients</div>
    );

  const addRecipeIngredient = (newIngredient: RecipeIngredient) => {
    const copy = [...recipeIngredients];
    copy.push(newIngredient);
    setRecipeIngredients(copy);
  };

  return (
    <div className="recipe-form-box">
      <div>Update Recipe</div>
      <UpdateRecipeNameForm recipe={props.recipe} />
      {recipeIngredientList}
      <hr className="recipe-ingredient-form-divider" />
      <AddRecipeIngredientForm
        recipeId={props.recipe.id}
        setRecipeIngredient={addRecipeIngredient}
      />
      <input
        className="recipe-form-done"
        type="button"
        onClick={onDone}
        value="🍻 Done 🍻"
      />
    </div>
  );
};

export default UpdateRecipeForm;
