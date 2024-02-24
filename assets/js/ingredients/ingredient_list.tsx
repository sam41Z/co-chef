import React, { useState, useEffect } from "react";
import {
  Ingredient as IngredientType,
  getIngredients,
} from "./ingredients_api";
import Ingredient from "./ingredient";

const IngredientList: React.FC<{}> = () => {
  const [ingredients, setIngredients] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    getIngredients()
      .then((response: IngredientType[]) => {
        setIngredients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const items = ingredients.map((ingredient) => (
    <Ingredient key={ingredient.id} id={ingredient.id} name={ingredient.name} />
  ));
  return <div>{items}</div>;
};

export default IngredientList;
