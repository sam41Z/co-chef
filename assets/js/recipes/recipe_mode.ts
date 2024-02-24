import { RecipeIngredient } from "./recipes_api";

export type RecipeMode = {
  name: "normal" | "bread";
  altUnit?: {
    suffix: string;
    invert: (input: number) => number;
    convert: (input: number) => number;
  };
  altInfo?: {
    title: string;
    get: (recipeIngredients: RecipeIngredient[]) => { info: string }[];
  };
};

export const getBreadMode = (total: number): RecipeMode => {
  const suffix = "%";
  const convert = (actual: number) => {
    return (actual / total) * 100;
  };
  return {
    name: "bread",
    altUnit: {
      suffix: suffix,
      convert: convert,
      invert: (percent: number) => {
        return (total * percent) / 100;
      },
    },
    altInfo: {
      title: "🍞",
      get: (recipeIngredients: RecipeIngredient[]) => {
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
        return [
          { info: `Flour: ${flourSum}g (${convert(flourSum)}${suffix})` },
          { info: `Hidration: ${convert(waterSum)}${suffix}` },
        ];
      },
    },
  };
};
export const getNormalMode = (): RecipeMode => ({ name: "normal" });
