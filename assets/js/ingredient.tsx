import React from "react";

interface IngredientProps {
  id: number,
  name: string
}

const Ingredient: React.FC<IngredientProps> = (props: IngredientProps) => {
  return (
    <div>{props.name}</div>
  );
}

export default Ingredient;
