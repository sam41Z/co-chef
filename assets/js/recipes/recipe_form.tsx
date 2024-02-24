import React, { useState, useEffect } from "react";
import { Recipe, RecipeIngredient } from "./recipes_api";
import { getRecipeIngredients } from "./recipes_api";
import UpdateRecipeIngredientForm from "./update_recipe_ingredient_form";
import RecipeNameForm from "./recipe_name_form";
import AddRecipeIngredientForm from "./add_recipe_ingredient_form";
import { Ingredient, getIngredients } from "../ingredients/ingredients_api";

interface RecipeFormProps {
  recipe: Recipe | undefined;
  onDone: (recipe: Recipe) => void;
}

const RecipeForm = (props: RecipeFormProps) => {
  const [loading, setLeading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[] | undefined
  >();
  const [ingredients, setIngredients] = useState<Ingredient[]>();

  useEffect(() => {
    getIngredients()
      .then((response: Ingredient[]) => {
        setIngredients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchRecipeIngredients = (id: number) => {
    getRecipeIngredients(id)
      .then((response: RecipeIngredient[]) => {
        setRecipeIngredients(response);
        setLeading(false);
      })
      .catch((error) => console.log(error));
  };

  const reset = () => {
    setRecipeIngredients(undefined);
    setRecipe(undefined);
    setLeading(false);
  };

  if (props.recipe && !recipeIngredients && !loading) {
    setLeading(true);
    setRecipe(props.recipe);
    fetchRecipeIngredients(props.recipe.id);
  } else if (recipe && props.recipe && props.recipe.id != recipe.id) {
    reset();
  }
  const onDone = () => {
    if (recipe) {
      const savedRecipe = recipe;
      props.onDone(savedRecipe);
    }
    reset();
  };

  let ingredientsForm;
  if (recipe && ingredients) {
    const items =
      recipeIngredients && recipeIngredients.length > 0 ? (
        recipeIngredients.map((item) => (
          <UpdateRecipeIngredientForm
            key={item.id}
            recipeId={recipe.id}
            recipeIngredient={item}
          />
        ))
      ) : (
        <div className="recipe-form-no-ingredients">No ingredients</div>
      );
    const setRecipeIngredient = (newIngredient: RecipeIngredient) => {
      const copy = recipeIngredients ? [...recipeIngredients] : [];
      copy.push(newIngredient);
      setRecipeIngredients(copy);
    };

    ingredientsForm = (
      <div>
        {items}
        <hr className="recipe-ingredient-form-divider" />
        <AddRecipeIngredientForm
          recipeId={recipe.id}
          ingredients={ingredients}
          setRecipeIngredient={setRecipeIngredient}
        />
      </div>
    );
  }
  return (
    <div className="recipe-form-box">
      <div>{recipe ? "Update Recipe" : "New Recipe"}</div>
      <RecipeNameForm recipe={recipe} setRecipe={setRecipe} />
      {ingredientsForm}
      <input
        className="recipe-form-done"
        type="button"
        onClick={onDone}
        value="🍻 Done 🍻"
      />
    </div>
  );
};

export default RecipeForm;
