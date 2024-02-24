import React, { useState, useEffect, SyntheticEvent } from "react";
import {
  Recipe,
  RecipeNew,
  RecipeIngredient,
  RecipeIngredientNew,
} from "./recipes_api";
import { postRecipe, postRecipeIngredient } from "./recipes_api";
import { Ingredient, getIngredients } from "../ingredients/ingredients_api";

const RecipeForm: React.FC<{}> = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [ingredient, setIngredient] = useState<RecipeIngredient>();

  if (recipe) {
    if (!recipe.ingredients) recipe.ingredients = [];
    if (ingredient) recipe.ingredients.push(ingredient);

    const setRecipeIngredient = (ingredient: RecipeIngredient) => {
      console.log(ingredient);
      setIngredient(ingredient);
    };

    const items = recipe.ingredients ? (
      recipe.ingredients.map((item) => (
        <div key={item.id}>
          {item.ingredient.name} {item.amount}
        </div>
      ))
    ) : (
      <div>No ingredients</div>
    );

    return (
      <div>
        <div>{recipe.name}</div>
        {items}
        <RecipeIngredientForm
          recipeId={recipe.id}
          setRecipeIngredient={setRecipeIngredient}
        />
      </div>
    );
  } else {
    return <RecipeNameForm setRecipe={setRecipe} />;
  }
};

interface RecipeNameFormProps {
  setRecipe: { (recipe: Recipe): any };
}

const RecipeNameForm: React.FC<RecipeNameFormProps> = (
  props: RecipeNameFormProps
) => {
  const [name, setName] = useState<string>("");
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveRecipe({ name: name });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const saveRecipe = (recipe: RecipeNew) => {
    postRecipe(recipe)
      .then((response: Recipe) => {
        props.setRecipe(response);
      })
      .catch((error: any) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recipe:
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

interface RecipeIngredientFormProps {
  recipeId: number;
  setRecipeIngredient: { (ingredient: RecipeIngredient): any };
}

const RecipeIngredientForm: React.FC<RecipeIngredientFormProps> = (
  props: RecipeIngredientFormProps
) => {
  const [amount, setAmount] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    getIngredients()
      .then((response: Ingredient[]) => {
        setIngredients(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (ingredient) {
      saveRecipeIngredient({ amount: amount, ingredient_id: ingredient.id });
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id: number = Number(event.target.value);
    const selected: Ingredient | undefined = ingredients.find(
      (item) => item.id === id
    );
    if (selected) setIngredient(selected);
  };

  const saveRecipeIngredient = (recipeIngredient: RecipeIngredientNew) => {
    postRecipeIngredient(props.recipeId, recipeIngredient)
      .then((response: RecipeIngredient) => {
        props.setRecipeIngredient(response);
      })
      .catch((error: any) => console.log(error));
  };

  const options = ingredients.map((ingredient) => (
    <option value={ingredient.id}> {ingredient.name} </option>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <label>Recipe:</label>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <label>Ingredient</label>
      <select name="ingredient" onChange={handleIngredientChange}>
        {options}
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};
export default RecipeForm;
