import React, { useState, useEffect }from "react";
import Ingredient from "./ingredient.tsx"

const IngredientList: React.FC<{}> = (props: {}) => {
  const [ingredients, setIngredients] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/ingredients`,
      {
        method: "GET"
      }
    )
    .then(res => res.json())
    .then(response => {
      setIngredients(response.data)
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
