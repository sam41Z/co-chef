import { post, get } from "../api_request";

export interface Ingredient {
  id: number;
  name: string;
}

export interface IngredientNew {
  name: string;
}

export function postIngredient(ingredient: IngredientNew) {
  return post("/api/ingredients", { ingredient: ingredient });
}

export function getIngredients() {
  return get("/api/ingredients");
}
