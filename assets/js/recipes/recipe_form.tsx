import React, { useState } from "react";
import { Recipe, RecipeIngredient } from "./recipes_api";
import { getRecipeIngredients } from "./recipes_api";
import RecipeIngredientForm from "./recipe_ingredient_form";
import RecipeNameForm from "./recipe_name_form";

interface RecipeFormProps {
  recipe: Recipe | undefined;
  onDone: (recipe: Recipe) => void;
}

const RecipeForm = (props: RecipeFormProps) => {
  const [loading, setLeading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const [ingredients, setIngredients] = useState<
    RecipeIngredient[] | undefined
  >();
  const fetchIngredients = (id: number) => {
    getRecipeIngredients(id)
      .then((response: RecipeIngredient[]) => {
        setIngredients(response);
        setLeading(false);
      })
      .catch((error) => console.log(error));
  };
  if (props.recipe && !ingredients && !loading) {
    setLeading(true);
    setRecipe(props.recipe);
    fetchIngredients(props.recipe.id);
  }
  const onDone = () => {
    if (recipe) {
      const savedRecipe = recipe;
      props.onDone(savedRecipe);
    }
    setIngredients(undefined);
    setRecipe(undefined);
    setLeading(false);
  };

  let ingredientsForm;
  if (recipe) {
    const items = ingredients ? (
      ingredients.map((item) => (
        <div key={item.id}>
          {item.ingredient.name} {item.amount}
        </div>
      ))
    ) : (
      <div>No ingredients</div>
    );
    const setRecipeIngredient = (newIngredient: RecipeIngredient) => {
      const copy = ingredients ? [...ingredients] : [];
      copy.push(newIngredient);
      setIngredients(copy);
    };

    ingredientsForm = (
      <div>
        {items}
        <RecipeIngredientForm
          recipeId={recipe.id}
          setRecipeIngredient={setRecipeIngredient}
        />
      </div>
    );
  }
  return (
    <div>
      <RecipeNameForm recipe={recipe} setRecipe={setRecipe} />
      {ingredientsForm}
      <input type="button" onClick={onDone} value="🍻" />
    </div>
  );
};

export default RecipeForm;
