import React, { useState, SyntheticEvent } from "react";
import { RecipeIngredient, RecipeIngredientNew } from "./recipes_api";
import { saveRecipeIngredient as saveRecipeIngredientApi } from "./recipes_api";
import { Ingredient } from "../ingredients/ingredients_api";
import { useIngredients } from "../ingredients/context";
import Select, { ValueType, ActionMeta } from "react-select";
import SelectStyles from "../select_react_styles";
import ConvertableInput from "../convertable_input";

type NewRecipeIngredientFormProps = {
  recipeId: number;
  altUnit?: {
    suffix: string;
    convert: (input: number) => number;
    invert: (input: number) => number;
  };
  setRecipeIngredient: { (ingredient: RecipeIngredient): any };
};

const AddRecipeIngredientForm = (props: NewRecipeIngredientFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient>();
  const { ingredients, setIngredients } = useIngredients();

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (ingredient)
      saveRecipeIngredient({
        amount: amount,
        ingredient_id: ingredient.id,
      });
    setIngredient(undefined);
    setAmount(0);
  };

  type SelectType = { value: number; label: string };
  const onIngredientChange = (
    valueType: ValueType<SelectType>,
    _action: ActionMeta<SelectType>
  ) => {
    if (valueType && "value" in valueType) {
      const id = valueType.value;
      const selected: Ingredient | undefined = ingredients.find(
        (item) => item.id === id
      );
      if (selected) setIngredient(selected);
    }
  };

  const saveRecipeIngredient = (recipeIngredient: RecipeIngredientNew) => {
    saveRecipeIngredientApi(props.recipeId, recipeIngredient)
      .then((response: RecipeIngredient) => {
        props.setRecipeIngredient(response);
      })
      .catch((error: any) => console.log(error));
  };

  const options = ingredients.map((item) => {
    const prefix = ingredient && ingredient.id === item.id ? "👉 " : "  ";
    return {
      value: item.id,
      label: prefix + item.name,
    };
  });
  const selectedOption = ingredient
    ? { value: ingredient.id, label: ingredient.name }
    : null;

  return (
    <form onSubmit={onSubmit} className="recipe-ingredient-form">
      <div className="recipe-ingredient-selector">
        <Select
          placeholder="Add ingredient..."
          options={options}
          value={selectedOption}
          onChange={onIngredientChange}
          theme={SelectStyles.theme}
          styles={SelectStyles.styles}
          menuPlacement="top"
        />
      </div>
      <ConvertableInput
        value={amount}
        altUnit={props.altUnit}
        onChange={(value: number) => setAmount(value)}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
export default AddRecipeIngredientForm;
