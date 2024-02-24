import React from "react";
import { Ingredient } from "./ingredients_api";

const Ingredient: React.FC<Ingredient> = (props: Ingredient) => {
  return <div>{props.name}</div>;
};

export default Ingredient;
