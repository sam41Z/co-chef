import { post, get, deleteFetch } from "../api_request";

export type Ingredient = {
  id: number;
  name: string;
  energy: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  protein: number;
  type: string;
};

export function compareIds(a: Ingredient, b: Ingredient) {
  return a.id === b.id;
}

export type IngredientNew = {
  name: string;
  energy: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  protein: number;
  type: string;
};

export function postIngredient(ingredient: IngredientNew) {
  return post("/api/ingredients", { ingredient: ingredient });
}

export function getIngredients() {
  return get("/api/ingredients");
}

export function deleteIngerdient(id: number) {
  return deleteFetch("/api/ingredients/" + id);
}
