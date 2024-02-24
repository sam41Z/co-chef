import React, { useState, useEffect } from "react";
import { Recipe, getRecipes, deleteRecipe } from "./recipes_api";
import NamedItem from "../named_item";
import UpdateRecipeForm from "./update_recipe_form";
import AddRecipeForm from "./add_recipe_form";

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
      .then(() => {
        const index = recipes.findIndex((recipe) => recipe.id === id);
      const copy = [...recipes];
        copy.splice(index, 1);
        setRecipes(recipes);
        if (recipe && id === recipe.id) setRecipe(undefined);
        fetchRecipes();
      })
      .catch((error) => console.log(error));
  };
  const onItemSelect = (id: number) => {
    const selected = recipes.find((recipe) => recipe.id === id);
    setRecipe(selected);
  };
  const onUpdateDone = (updatedRecipe: Recipe) => {
    const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
    const copy = [...recipes];
    copy.splice(index, 1, updatedRecipe);
    setRecipes(copy);
    setRecipe(undefined);
    fetchRecipes();
  };
  const addNewRecipe = (newRecipe: Recipe) => {
    const copy = [...recipes];
    copy.push(newRecipe);
    setRecipes(copy);
    setRecipe(newRecipe);
    fetchRecipes();
  };

  const items = recipes
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => {
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
  const recipeForm = recipe ? (
    <UpdateRecipeForm
      key={recipe.id}
      recipe={recipe}
      onCopy={addNewRecipe}
      onUpdateDone={onUpdateDone}
    />
  ) : (
    <AddRecipeForm setRecipe={addNewRecipe} />
  );

  return (
    <div className="box box-row">
      <div className="recipe-list">
        <ul>{items}</ul>
      </div>
      <hr />
      <div className="recipe-forms">{recipeForm}</div>
    </div>
  );
};

export default Recipes;
