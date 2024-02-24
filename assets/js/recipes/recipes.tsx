import React, { useState, useEffect } from "react";
import { Recipe, getRecipes, deleteRecipe } from "./recipes_api";
import NamedItem from "../named_item";
import UpdateRecipeForm from "./update_recipe_form";
import AddRecipeForm from "./add_recipe_form";
import { useParams, useHistory } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const basePath = "/recipes/";

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

  const findRecipe = (id?: number | string) =>
    recipes.find((recipe) => recipe.id === Number(id));

  const onClickDelete = (deleteId: number) => {
    deleteRecipe(deleteId)
      .then(() => {
        const index = recipes.findIndex((recipe) => recipe.id === deleteId);
        const copy = [...recipes];
        copy.splice(index, 1);
        setRecipes(recipes);
        fetchRecipes();
        history.push(basePath);
      })
      .catch((error) => console.log(error));
  };
  const onUpdateDone = (updatedRecipe: Recipe) => {
    const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
    const copy = [...recipes];
    copy.splice(index, 1, updatedRecipe);
    setRecipes(copy);
    fetchRecipes();
    history.push(basePath);
  };
  const addNewRecipe = (newRecipe: Recipe) => {
    const copy = [...recipes];
    copy.push(newRecipe);
    setRecipes(copy);
    fetchRecipes();
    history.push(basePath + newRecipe.id);
  };

  const items = recipes
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => {
      const name = Number(id) === item.id ? "✏️ " + item.name : item.name;
      return (
        <NamedItem
          key={item.id}
          id={item.id}
          name={name}
          path={basePath + item.id}
          onClickDelete={onClickDelete}
        />
      );
    });
  const recipe = findRecipe(id);
  const recipeForm = recipe ? (
    <UpdateRecipeForm
      key={recipe.id}
      recipe={recipe}
      onCopy={addNewRecipe}
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
