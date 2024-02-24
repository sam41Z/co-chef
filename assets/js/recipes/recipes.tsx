import React, { useState, useEffect } from "react";
import { Recipe, getRecipes, deleteRecipe } from "./recipes_api";
import NamedItem from "../named_item";
import RecipeForm from "./recipe_form";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe>();
  const fetchRecipes = () => {
    getRecipes()
      .then((response: Recipe[]) => {
        setRecipes(response);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const onClickDelete = (id: number) => {
    deleteRecipe(id)
      .then(() => fetchRecipes())
      .catch((error) => console.log(error));
  };
  const onItemSelect = (id: number) => {
    const selected = recipes.find((recipe) => recipe.id === id);
    setRecipe(selected);
  };
  const onDone = () => {
    setRecipe(undefined);
    fetchRecipes();
  };

  const items = recipes.map((item) => {
    const name =
      recipe && recipe.id === item.id ? "✏️ " + item.name : item.name;
    return (
      <NamedItem
        key={item.id}
        id={item.id}
        name={name}
        onItemSelect={onItemSelect}
        onClickDelete={onClickDelete}
      />
    );
  });
  console.log(recipe);
  return (
    <div className="box">
      <ul>{items}</ul>
      <hr />
      <RecipeForm recipe={recipe} onDone={onDone} />
    </div>
  );
};

export default Recipes;
