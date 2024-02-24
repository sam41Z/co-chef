import React, { useState, SyntheticEvent } from "react";
import { Ingredient } from "./ingredients_api.tsx"
import { postIngredient } from "./ingredients_api.tsx"

const IngredientForm: React.FC<{}> = (props: {}) => {
  const [name, setName] = useState<string>("");
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveIngredient({name: name});
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const saveIngredient = (ingredient: Ingredient) => {
    postIngredient(ingredient)
    .then(response => {
      setName("")
    })
    .catch(error => console.log(error));
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
