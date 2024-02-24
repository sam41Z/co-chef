import { post, get, deleteFetch } from "../api_request";
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

export function getRecipes() {
  return get("/api/recipes");
}

export function deleteRecipe(id: number) {
  return deleteFetch("/api/recipes/" + id);
}
