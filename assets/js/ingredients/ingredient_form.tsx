import React, { useState, SyntheticEvent } from "react";
import { IngredientNew, Ingredient } from "./ingredients_api";
import { postIngredient } from "./ingredients_api";

const IngredientForm = (props: {
  onSave: (ingredient: Ingredient) => void;
}) => {
  const [name, setName] = useState<string>("");
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveIngredient({ name: name });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const saveIngredient = (ingredient: IngredientNew) => {
    postIngredient(ingredient)
      .then((response: Ingredient) => {
        props.onSave(response);
        setName("");
      })
      .catch((error: any) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ingredient:
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default IngredientForm;
