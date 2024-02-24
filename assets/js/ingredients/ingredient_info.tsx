import React from "react";
import { Ingredient } from "./ingredients_api";
import { CSSTransition } from "react-transition-group";

type IngredientInfoProps = {
  ingredient: Ingredient;
};
const IngredientInfo = (props: IngredientInfoProps) => {
  const ingredient = props.ingredient;
  return (
    <div>
      <div className="info-box">
        <div className="info-box-title">{ingredient.name}</div>
        Nutrition facts (per 100g):
        <ul>
          <li>Energy : {ingredient.energy} kj</li>
          <li>Carbohydrates: {ingredient.carbohydrates}g</li>
          <li>Fat: {ingredient.fat}g</li>
          <li>Fiber: {ingredient.fiber}g</li>
          <li>Protein: {ingredient.protein}g</li>
        </ul>
      </div>
      <hr />
    </div>
  );
};
export default IngredientInfo;
