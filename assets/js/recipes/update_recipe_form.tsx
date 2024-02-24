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
import { CSSTransition } from "react-transition-group";

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
  onNameChange: (recipe: Recipe) => void;
};

const UpdateRecipeForm = (props: UpdateRecipeFormProps) => {
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const basePath = "/recipes/";

  useEffect(() => {
    fetchRecipeIngredients(props.recipe.id);
  }, []);

  const fetchRecipeIngredients = (id: number) => {
    getRecipeIngredients(id)
      .then((response: RecipeIngredient[]) => {
        setRecipeIngredients(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const onChangeRecipeIngredient = (
    changedRecipeIngredient: RecipeIngredient
  ) => {
    setRecipeIngredients(
      Lists.replace(recipeIngredients, changedRecipeIngredient, compareIds)
    );
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
  const invert = (percent: number) => {
    return (total * percent) / 100;
  };
  const convert = (actual: number) => {
    return (actual / total) * 100;
  };

  const recipeIngredientList =
    recipeIngredients.length > 0 ? (
      recipeIngredients.map((item) => (
        <UpdateRecipeIngredientForm
          key={item.id}
          recipeId={props.recipe.id}
          recipeIngredient={item}
          altUnit={{ suffix: "%", convert: convert, invert: invert }}
          onChange={onChangeRecipeIngredient}
          onDelete={onDeleteRecipeIngredient}
        />
      ))
    ) : (
      <div className="recipe-form-no-ingredients">No ingredients</div>
    );

  const addRecipeIngredient = (newIngredient: RecipeIngredient) => {
    setRecipeIngredients(Lists.add(recipeIngredients, newIngredient));
  };
  const loadingComponent = !loading && (
    <div>
      <UpdateRecipeNameForm
        recipe={props.recipe}
        onNameChange={props.onNameChange}
      />
      <RecipeInfoBox suffix="%" inverter={invert} converter={convert} />
      {recipeIngredientList}
      <hr />
      <AddRecipeIngredientForm
        recipeId={props.recipe.id}
        altUnit={{ suffix: "%", convert: convert, invert: invert }}
        setRecipeIngredient={addRecipeIngredient}
      />
    </div>
  );

  return (
    <RecipeContext.Provider value={{ recipeIngredients, setRecipeIngredients }}>
      <div className="recipe-form-box">
        <div className="recipe-form-box-title">
          📖 Update Recipe
          <Link to={basePath}>📕</Link>
          <a onClick={(_event) => onCopy(props.recipe.id)}>🧑‍🍳</a>
        </div>
        <CSSTransition in={!loading} timeout={500} classNames="loading-box">
          <div>{loadingComponent}</div>
        </CSSTransition>
      </div>
    </RecipeContext.Provider>
  );
};

export default UpdateRecipeForm;
