import React, { useState, SyntheticEvent } from "react";
import { RecipeIngredient, RecipeIngredientNew } from "./recipes_api";
import { saveRecipeIngredient as saveRecipeIngredientApi } from "./recipes_api";
import { Ingredient } from "../ingredients/ingredients_api";
import { useIngredients } from "../ingredients/context";
import Select, { ValueType, ActionMeta } from "react-select";
import SelectStyles from "../select_react_styles";

type NewRecipeIngredientFormProps = {
  recipeId: number;
  suffix: string;
  converter: (input: number) => number;
  inverter: (input: number) => number;
  setRecipeIngredient: { (ingredient: RecipeIngredient): any };
};

const AddRecipeIngredientForm = (props: NewRecipeIngredientFormProps) => {
  const [amount, setAmount] = useState<string>("0");
  const [ingredient, setIngredient] = useState<Ingredient>();
  const { ingredients, setIngredients } = useIngredients();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (ingredient)
      saveRecipeIngredient({
        amount: props.converter(Number(amount)),
        ingredient_id: ingredient.id,
      });
    setIngredient(undefined);
    setAmount("0");
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  type SelectType = { value: number; label: string };
  const handleIngredientChange = (
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

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();
  return (
    <form onSubmit={handleSubmit} className="recipe-ingredient-form">
      <div className="recipe-ingredient-selector">
        <Select
          placeholder="Add ingredient..."
          options={options}
          value={selectedOption}
          onChange={handleIngredientChange}
          theme={SelectStyles.theme}
          styles={SelectStyles.styles}
        />
      </div>
      <input
        type="number"
        name="amount"
        style={{ width: 10 + "em" }}
        value={amount}
        onChange={handleAmountChange}
        onFocus={handleFocus}
      />
      <div>{props.suffix}</div>
      <input type="submit" value="Add" />
    </form>
  );
};
export default AddRecipeIngredientForm;
