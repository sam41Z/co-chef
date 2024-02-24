import { post, get } from "../api_request";
import { Ingredient } from "../ingredients/ingredients_api";

export interface Recipe {
  id: number;
  name: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeNew {
  name: string;
}

export interface RecipeIngredient {
  id: number;
  amount: number;
  ingredient: Ingredient;
}

export interface RecipeIngredientNew {
  amount: number;
  ingredient_id: number;
}

export function postRecipe(recipe: RecipeNew) {
  return post("/api/recipes", { recipe: recipe });
}

export function postRecipeIngredient(
  recipeId: number,
  recipeIngredient: RecipeIngredientNew
) {
  return post("/api/recipes/" + recipeId + "/ingredients", {
    recipe_ingredient: recipeIngredient,
  });
}

export function getIngredients() {
  return get("/api/recipes");
}
