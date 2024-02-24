import { createContext, useContext } from "react";
import { Ingredient } from "./ingredients_api";

export type IngredientContextType = {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
};

export const IngredientContext = createContext<IngredientContextType>({
  ingredients: [],
  setIngredients: (_ingredients) => console.warn("no ingredients provider"),
});
export const useIngredients = () => useContext(IngredientContext);
