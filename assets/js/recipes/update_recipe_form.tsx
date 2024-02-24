import React, { useState, useEffect } from "react";
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
import { RecipeMode, getBreadMode, getNormalMode } from "./recipe_mode";
import { useSnackBox } from "../snackbox";

type UpdateRecipeFormProps = {
  recipe: Recipe;
  onCopy: (recipe: Recipe) => void;
  onNameChange: (recipe: Recipe) => void;
};

const UpdateRecipeForm = (props: UpdateRecipeFormProps) => {
  const [recipeMode, setRecipeMode] = useState<RecipeMode>(getBreadMode(400));
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const basePath = "/recipes/";

  const toggleRecipeMode = () =>
    recipeMode.name == "normal"
      ? setRecipeMode(getBreadMode(400))
      : setRecipeMode(getNormalMode());

  const sendSnack = useSnackBox();
  useEffect(() => {
    fetchRecipeIngredients(props.recipe.id);
  }, []);

  const fetchRecipeIngredients = (id: number) => {
    getRecipeIngredients(id)
      .then((response: RecipeIngredient[]) => {
        setRecipeIngredients(response);
        setLoading(false);
      })
      .catch((error: any) => {
        sendSnack("Unable to fetch recipe ingredients!");
        console.log(error);
      });
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
      .catch((error: any) => {
        sendSnack("Unable to copy recipe!");
        console.log(error);
      });
  };

  const recipeIngredientList =
    recipeIngredients.length > 0 ? (
      recipeIngredients.map((item) => (
        <UpdateRecipeIngredientForm
          key={item.id}
          recipeId={props.recipe.id}
          recipeIngredient={item}
          altUnit={recipeMode.altUnit}
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
      <RecipeInfoBox
        recipeIngredients={recipeIngredients}
        altInfo={recipeMode.altInfo}
      />
      {recipeIngredientList}
      <hr />
      <AddRecipeIngredientForm
        recipeId={props.recipe.id}
        altUnit={recipeMode.altUnit}
        setRecipeIngredient={addRecipeIngredient}
      />
    </div>
  );

  return (
    <div className="recipe-form-box">
      <div className="recipe-form-box-title">
        📖 Update Recipe
        <Link to={basePath} title="close recipe">
          📕
        </Link>
        <a onClick={(_event) => onCopy(props.recipe.id)} title="copy recipe">
          🧑‍🍳
        </a>
        <a onClick={(_event) => toggleRecipeMode()} title="toggle recipe mode">
          🍞
        </a>
      </div>
      <CSSTransition in={!loading} timeout={500} classNames="loading-box">
        <div>{loadingComponent}</div>
      </CSSTransition>
    </div>
  );
};

export default UpdateRecipeForm;
