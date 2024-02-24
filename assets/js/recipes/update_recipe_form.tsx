import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Recipe,
  RecipeIngredient,
  getRecipeIngredients,
  copyRecipe,
  compareIds,
} from "./recipes_api";
import UpdateRecipeIngredientForm from "./update_recipe_ingredient_form";
import UpdateRecipeNameForm from "./update_recipe_name_form";
import AddRecipeIngredientForm from "./add_recipe_ingredient_form";
import Lists from "../lists";
import { Link } from "react-router-dom";

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

type UpdateRecipeFormProps = {
  recipe: Recipe;
  onCopy: (recipe: Recipe) => void;
};

const UpdateRecipeForm = (props: UpdateRecipeFormProps) => {
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);

  const basePath = "/recipes/";

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

  const onDeleteRecipeIngredient = (
    deletedRecipeIngredient: RecipeIngredient
  ) => {
    setRecipeIngredients(
      Lists.remove(recipeIngredients, deletedRecipeIngredient, compareIds)
    );
  };

  const onCopy = (id: number) => {
    console.log(id);
    copyRecipe(id)
      .then((response: Recipe) => props.onCopy(response))
      .catch((error) => console.log(error));
  };
  const total = 400;
  const converter = (percent: number) => {
    return Math.round(total * percent) / 100;
  };
  const inverter = (actual: number) => {
    return Math.round((actual / total) * 10000) / 100;
  };
  const sum = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  const starterSum = recipeIngredients
    .filter((item) => item.ingredient.type === "starter")
    .map((item) => item.amount)
    .reduce(sum, 0);

  const flourSum = recipeIngredients
    .filter((item) => item.ingredient.type === "flour")
    .map((item) => item.amount)
    .reduce(sum, starterSum / 2);
  const waterSum = recipeIngredients
    .filter((item) => item.ingredient.type === "water")
    .map((item) => item.amount)
    .reduce(sum, starterSum / 2);

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
    setRecipeIngredients(Lists.add(recipeIngredients, newIngredient));
  };

  return (
    <RecipeContext.Provider value={{ recipeIngredients, setRecipeIngredients }}>
      <div className="recipe-form-box">
        <div className="recipe-form-box-title">
          📖 Update Recipe 
          <Link to={basePath}>📕</Link>
          <a onClick={(_event) => onCopy(props.recipe.id)}>♻️</a>
        </div>
        <div className="info-box">
          <div className="info-box-title">Total</div>
          <ul>
            <li>
              Flour: {flourSum} ({inverter(flourSum)}%)
            </li>
            <li>
              Water: {waterSum} ({inverter(waterSum)}%)
            </li>
          </ul>
        </div>
        <UpdateRecipeNameForm recipe={props.recipe} />
        {recipeIngredientList}
        <hr />
        <AddRecipeIngredientForm
          recipeId={props.recipe.id}
          suffix="%"
          converter={converter}
          inverter={inverter}
          setRecipeIngredient={addRecipeIngredient}
        />
      </div>
    </RecipeContext.Provider>
  );
};

export default UpdateRecipeForm;
