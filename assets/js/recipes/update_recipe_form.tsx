import React, { useState, useEffect, createContext, useContext } from "react";
import {} from "react";
import { Recipe, RecipeIngredient } from "./recipes_api";
import { getRecipeIngredients } from "./recipes_api";
import UpdateRecipeIngredientForm from "./update_recipe_ingredient_form";
import UpdateRecipeNameForm from "./update_recipe_name_form";
import AddRecipeIngredientForm from "./add_recipe_ingredient_form";

export type RecipeContextType = {
  recipeIngredients: RecipeIngredient[];
  setRecipeIngredients: (recipeIngredients: RecipeIngredient[]) => void;
};

export const RecipeContext = createContext<RecipeContextType>({
  recipeIngredients: [],
  setRecipeIngredients: (_ingredients) =>
    console.warn("no ingredients provider"),
});
export const useRecipeIngredients = () => useContext(RecipeContext);

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
  const total = 400;
  const converter = (percent: number) => {
    return total * percent * 0.01;
  };
  const inverter = (actual: number) => {
    return (actual / total) * 100;
  };
  const sum = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  const flourSum = recipeIngredients
    .map((item) => {
      console.log(item.ingredient);
      return item;
    })
    .filter((item) => item.ingredient.type === "flour")
    .map((item) => item.amount)
    .reduce(sum, 0);
  const waterSum = recipeIngredients
    .filter((item) => item.ingredient.type === "water")
    .map((item) => item.amount)
    .reduce(sum, 0);

  const recipeIngredientList =
    recipeIngredients.length > 0 ? (
      recipeIngredients.map((item) => (
        <UpdateRecipeIngredientForm
          key={item.id}
          recipeId={props.recipe.id}
          recipeIngredient={item}
          suffix="%"
          converter={converter}
          inverter={inverter}
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
    <RecipeContext.Provider
      value={{ recipeIngredients, setRecipeIngredients }}
    >
      <div className="recipe-form-box">
        <div>Update Recipe</div>
        <div>
          Total flour: {flourSum} ({inverter(flourSum)}%), total water:{" "}
          {waterSum} ({inverter(waterSum)}%)
        </div>
        <UpdateRecipeNameForm recipe={props.recipe} />
        {recipeIngredientList}
        <hr />
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
    </RecipeContext.Provider>
  );
};

export default UpdateRecipeForm;
