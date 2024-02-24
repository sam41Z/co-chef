import React from "react";
import { RecipeIngredient } from "./recipes_api";

type RecipeInfoBoxProps = {
  recipeIngredients: RecipeIngredient[];
  altInfo?: {
    title: string;
    get: (recipeIngredients: RecipeIngredient[]) => { info: string }[];
  };
};
const RecipeInfoBox = (props: RecipeInfoBoxProps) => {
  const recipeIngredients = props.recipeIngredients;

  const sum = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  const carbs = recipeIngredients
    .map((item) => (item.amount * item.ingredient.carbohydrates) / 100)
    .reduce(sum, 0);
  const energy = recipeIngredients
    .map((item) => (item.amount * item.ingredient.energy) / 100)
    .reduce(sum, 0);
  const kcal = energy / 4.184;
  const fat = recipeIngredients
    .map((item) => (item.amount * item.ingredient.fat) / 100)
    .reduce(sum, 0);
  const fiber = recipeIngredients
    .map((item) => (item.amount * item.ingredient.fiber) / 100)
    .reduce(sum, 0);
  const protein = recipeIngredients
    .map((item) => (item.amount * item.ingredient.protein) / 100)
    .reduce(sum, 0);

  const typeInfoBox = props.altInfo && (
    <div className="info-box">
      <div className="info-box-title">{props.altInfo.title}</div>
      <ul>
        {props.altInfo.get(props.recipeIngredients).map((item, index) => {
          return <li key={index}>{item.info}</li>;
        })}
      </ul>
    </div>
  );

  return (
    <div>
      <div className="info-box">
        <div className="info-box-title">Nutrition facts (/100g)</div>
        <ul>
          <li>
            Energy: {energy.toFixed(1)}kj ({kcal.toFixed(1)}kcal)
          </li>
          <li>Carbohydrates: {carbs.toFixed(1)}g</li>
          <li>Fat: {fat.toFixed(1)}g</li>
          <li>Fiber: {fiber.toFixed(1)}g</li>
          <li>Protein: {protein.toFixed(1)}g</li>
        </ul>
      </div>
      {typeInfoBox}
    </div>
  );
};
export default RecipeInfoBox;
