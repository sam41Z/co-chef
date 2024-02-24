import React, { useState, useEffect }from "react";
import Ingredient from "./ingredient.tsx";
import { getIngredients } from "./ingredients_api.tsx";

const IngredientList: React.FC<{}> = (props: {}) => {
  const [ingredients, setIngredients] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    getIngredients()
    .then(response => {
      setIngredients(response)
    })
    .catch(error => console.log(error));
  }, []);

  const items = ingredients.map((ingredient) => 
      <Ingredient key={ingredient.id} id={ingredient.id} name={ingredient.name} />
    );
  return (
    <div>{items}</div>
  );
};

export default IngredientList;
