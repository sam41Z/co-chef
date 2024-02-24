import React, { useEffect } from "react";
import {
  Ingredient as IngredientType,
  getIngredients,
  deleteIngerdient,
} from "./ingredients_api";
import NamedItem from "../named_item";
import IngredientForm from "./ingredient_form";
import { useIngredients } from "./context";

const Ingredients = () => {
  const { ingredients, setIngredients } = useIngredients();

  const fetchIngredients = () => {
    getIngredients()
      .then((response: IngredientType[]) => {
        setIngredients(response);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchIngredients();
  }, []);
  const onClickDelete = (id: number) => {
    deleteIngerdient(id)
      .then(() => fetchIngredients())
      .catch((error) => console.log(error));
  };

  const onSave = (_ingredient: IngredientType) => fetchIngredients();

  const items = ingredients.map((ingredient) => (
    <NamedItem
      key={ingredient.id}
      id={ingredient.id}
      name={ingredient.name}
      onItemSelect={() => {}}
      onClickDelete={onClickDelete}
    />
  ));
  return (
    <div className="box">
      <ul>{items}</ul>
      <hr />
      <IngredientForm onSave={onSave} />
    </div>
  );
};

export default Ingredients;
