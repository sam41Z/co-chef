import React from "react";
import { useRecipeIngredients } from "./update_recipe_form";
type RecipeInfoBoxProps = {
  suffix: string;
  converter: (input: number) => number;
  inverter: (input: number) => number;
};
const RecipeInfoBox = (props: RecipeInfoBoxProps) => {
  const { recipeIngredients, setRecipeIngredients } = useRecipeIngredients();
  const sum = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  const starterSum = recipeIngredients
    .filter((item) => item.ingredient.type === "starter")
    .map((item) => item.amount)
    .reduce(sum, 0);

  const flourSum = recipeIngredients
    .filter((item) => item.ingredient.type === "flour")
    .map((item) => item.amount)
    .reduce(sum, starterSum / 2);
  const waterSum = recipeIngredients
    .filter((item) => item.ingredient.type === "water")
    .map((item) => item.amount)
    .reduce(sum, starterSum / 2);

  const carbs = recipeIngredients
    .map((item) => (item.amount * item.ingredient.carbohydrates) / 100)
    .reduce(sum, 0);
  const energy = recipeIngredients
    .map((item) => (item.amount * item.ingredient.energy) / 100)
    .reduce(sum, 0);
  const kcal = (energy / 4.184);
  const fat = recipeIngredients
    .map((item) => (item.amount * item.ingredient.fat) / 100)
    .reduce(sum, 0);
  const fiber = recipeIngredients
    .map((item) => (item.amount * item.ingredient.fiber) / 100)
    .reduce(sum, 0);
  const protein = recipeIngredients
    .map((item) => (item.amount * item.ingredient.protein) / 100)
    .reduce(sum, 0);

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
      <div className="info-box">
        <div className="info-box-title">🥖🥖🥖</div>
        <ul>
          <li>
            Flour: {flourSum} ({props.inverter(flourSum).toFixed(0)}){props.suffix}
          </li>
          <li>
            Water: {waterSum} ({props.inverter(waterSum).toFixed(0)}
            {props.suffix})
          </li>
        </ul>
      </div>
    </div>
  );
};
export default RecipeInfoBox;
