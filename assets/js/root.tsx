import React, { useState, useEffect } from "react";
import Ingredients from "./ingredients/ingredients";
import Recipes from "./recipes/recipes";
import { Ingredient, getIngredients } from "./ingredients/ingredients_api";
import { IngredientContext } from "./ingredients/context";

const Root = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    getIngredients().then((ingredients: Ingredient[]) => {
      setIngredients(ingredients);
    });
  }, []);
  return (
    <section className="phx-hero">
      <IngredientContext.Provider value={{ ingredients, setIngredients }}>
        <Recipes />
        <Ingredients />
      </IngredientContext.Provider>
    </section>
  );
};

export default Root;
