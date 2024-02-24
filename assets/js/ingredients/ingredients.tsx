import React, { useState, useEffect } from "react";
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
  const [ingredient, setIngredient] = useState<IngredientType>();

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

  const onItemSelect = (id: number) => {
    const selected = ingredients.find((item) => item.id === id);
    setIngredient(
      ingredient && selected && ingredient.id === selected.id
        ? undefined
        : selected
    );
  };

  const onClickDelete = (id: number) => {
    deleteIngerdient(id)
      .then(() => fetchIngredients())
      .catch((error) => console.log(error));
  };

  const onSave = (_ingredient: IngredientType) => fetchIngredients();
  const items = ingredients.map((item) => {
    const prefix = ingredient && ingredient.id === item.id ? "👉 " : "  ";
    return (
      <NamedItem
        key={item.id}
        id={item.id}
        name={prefix + item.name}
        onItemSelect={onItemSelect}
        onClickDelete={onClickDelete}
        showDelete={item.type !== "water"}
      />
    );
  });
  const details = ingredient && (
    <div>
      <div className="info-box">
        <div className="info-box-title">{ingredient.name}</div>
        Nutrition facts (per 100g):
        <ul>
          <li>Energy : {ingredient.energy} kj</li>
          <li>Carbohydrates: {ingredient.carbohydrates}g</li>
          <li>Fat: {ingredient.fat}g</li>
          <li>Fiber: {ingredient.fiber}g</li>
          <li>Protein: {ingredient.protein}g</li>
        </ul>
      </div>
      <hr />
    </div>
  );
  return (
    <div className="box box-row">
      <div className="ingredient-list">
        <ul>{items}</ul>
      </div>
      <hr />
      <div className="box-row-item">
        {details}
        Add ingredient:
        <div className="ingredient-form">
          <IngredientForm onSave={onSave} />
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
