import React, { useState, SyntheticEvent } from "react";
import { Recipe, RecipeNew } from "./recipes_api";
import { postRecipe } from "./recipes_api";

interface RecipeNameFormProps {
  setRecipe: { (recipe: Recipe): any };
  recipe: Recipe | undefined;
}

const RecipeNameForm = (props: RecipeNameFormProps) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [name, setName] = useState<string>("");

  if (
    (props.recipe && !recipe) ||
    (props.recipe && recipe && props.recipe.id !== recipe.id)
  ) {
    setRecipe(props.recipe);
    setName(props.recipe.name);
  } else if (!props.recipe && recipe) {
    setRecipe(undefined);
    setName("");
  }
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (props.recipe) {
      const recipe = props.recipe;
      recipe.name = name;
      updateRecipe(recipe);
    } else createRecipe({ name: name });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const createRecipe = (recipe: RecipeNew) => {
    postRecipe(recipe)
      .then((response: Recipe) => {
        props.setRecipe(response);
      })
      .catch((error: any) => console.log(error));
  };
  const updateRecipe = (recipe: Recipe) => {
    console.log(recipe);
  };
  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Recipe name:</label>
        <input
          type="text"
          size={25}
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value={recipe ? "Update" : "Save"} />
    </form>
  );
};
export default RecipeNameForm;
