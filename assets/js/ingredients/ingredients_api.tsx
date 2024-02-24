import { post, get } from "../api_request.tsx";

export interface Ingredient {
  id?: number,
  name: string
};

export function postIngredient (ingredient: Ingredient) {
  return post('/api/ingredients', {ingredient: ingredient});
};

export function getIngredients () {
  return get('/api/ingredients');
};
