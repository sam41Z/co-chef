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
import RecipeInfoBox from "./recipe_info_box";

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
    return total * percent;
  };
  const inverter = (actual: number) => {
    return (actual / total) * 100;
  };

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
        <UpdateRecipeNameForm recipe={props.recipe} />
        <RecipeInfoBox suffix="%" inverter={inverter} converter={converter} />
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
