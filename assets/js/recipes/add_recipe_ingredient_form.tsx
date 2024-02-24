import React, { useState, SyntheticEvent } from "react";
import { RecipeIngredient, RecipeIngredientNew } from "./recipes_api";
import { saveRecipeIngredient as saveRecipeIngredientApi } from "./recipes_api";
import { Ingredient } from "../ingredients/ingredients_api";
import { useIngredients } from "../ingredients/context";
import Select, { ValueType, ActionMeta } from "react-select";

type NewRecipeIngredientFormProps = {
  recipeId: number;
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
        amount: Number(amount),
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

  const options = ingredients.map((ingredient) => {
    return {
      value: ingredient.id,
      label: ingredient.name,
    };
  });
  const selectedOption = ingredient
    ? { value: ingredient.id, label: ingredient.name }
    : null;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      borderColor: "#b200b2",
      boxShadow: "none",
    }),
  };
  const customTheme = (theme: any) => ({
    ...theme,
    borderRadius: "0.2rem",
    colors: {
      ...theme.colors,
      primary: "#00e000",
      primary25: "b200b2",
      primary50: "#ff00ff",
      primary75: "#ff00ff",
      neutral0: "black",
      neutral5: "black",
      neutral10: "#ff00ff",
      neutral20: "#b200b2",
      neutral30: "#ff00ff",
      neutral40: "#ff00ff",
      neutral50: "#00e000",
      neutral60: "#b200b2",
      neutral70: "#ff00ff",
      neutral80: "#00e000",
      neutral90: "#ff00ff",
      danger: "yellow",
    },
  });
  return (
    <form onSubmit={handleSubmit} className="recipe-ingredient-form">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleIngredientChange}
        theme={customTheme}
        styles={customStyles}
      />
      <input
        type="number"
        name="amount"
        style={{ width: 10 + "em" }}
        value={amount}
        onChange={handleAmountChange}
        onFocus={handleFocus}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
export default AddRecipeIngredientForm;
