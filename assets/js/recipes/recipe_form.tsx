import React, { useState, useEffect, SyntheticEvent } from "react";
import {
  Recipe,
  RecipeNew,
  RecipeIngredient,
  RecipeIngredientNew,
} from "./recipes_api";
import { postRecipe, postRecipeIngredient } from "./recipes_api";
import { Ingredient, getIngredients } from "../ingredients/ingredients_api";

const RecipeForm = (props: { onDone: (recipe: Recipe) => void }) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [ingredient, setIngredient] = useState<RecipeIngredient | undefined>();

  const onDone = () => {
    if (recipe) {
      const savedRecipe = recipe;
      props.onDone(savedRecipe);
    }
    setRecipe(undefined);
    setIngredient(undefined);
  };

  if (recipe) {
    if (!recipe.ingredients) recipe.ingredients = [];
    if (ingredient) recipe.ingredients.push(ingredient);

    const setRecipeIngredient = (ingredient: RecipeIngredient) => {
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
        <div>Name: {recipe.name}</div>
        {items}
        <RecipeIngredientForm
          recipeId={recipe.id}
          setRecipeIngredient={setRecipeIngredient}
        />
        <input type="button" onClick={onDone} value="🍻🍻🍻🍻" />
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
        Recipe name:
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
};

interface RecipeIngredientFormProps {
  recipeId: number;
  setRecipeIngredient: { (ingredient: RecipeIngredient): any };
}

const RecipeIngredientForm = (props: RecipeIngredientFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient | undefined>();
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
      setIngredient(undefined);
      setAmount(0);
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

  if (!ingredient && ingredients && ingredients.length > 0) {
    setIngredient(ingredients[0]);
  }
  const options = ingredients.map((ingredient) => (
    <option key={ingredient.id} value={ingredient.id}>
      {ingredient.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <label>add ingredient:</label>
      <input
        type="number"
        name="amount"
        style={{ width: 10 + "em" }}
        value={amount}
        onChange={handleAmountChange}
      />
      <label>ingredient</label>
      <select name="ingredient" onChange={handleIngredientChange}>
        {options}
      </select>
      <input type="submit" value="Save" />
    </form>
  );
};
export default RecipeForm;
