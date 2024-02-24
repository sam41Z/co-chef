import React, { useState, SyntheticEvent } from "react";
import { postRecipe, Recipe } from "./recipes_api";

const AddRecipeForm = (props: { setRecipe: (recipe: Recipe) => void }) => {
  const [name, setName] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    postRecipe({ name: name })
      .then((recipe: Recipe) => {
        props.setRecipe(recipe);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="recipe-form-box">
      New Recipe
      <div className="recipe-name-form">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
