import React, { useState, useEffect } from "react";
import {
  Ingredient as IngredientType,
  getIngredients,
  deleteIngerdient,
} from "./ingredients_api";
import NamedItem from "../named_item";
import IngredientForm from "./ingredient_form";
import { useIngredients } from "./context";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Ingredients = () => {
  const { ingredients, setIngredients } = useIngredients();
  const { id } = useParams<{ id?: string }>();
  const basePath = "/ingredients/";
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

  const findIngredient = (id?: number | string) =>
    ingredients.find((item) => item.id === Number(id));

  const onClickDelete = (id: number) => {
    deleteIngerdient(id)
      .then(() => fetchIngredients())
      .catch((error) => console.log(error));
  };

  const onSave = (_ingredient: IngredientType) => fetchIngredients();
  const items = ingredients.map((item) => {
    const prefix = id && Number(id) === item.id ? "👀 " : "  ";
    return (
      <NamedItem
        key={item.id}
        id={item.id}
        name={prefix + item.name}
        linkTarget={basePath + item.id}
        onClickDelete={onClickDelete}
        showDelete={item.type !== "water"}
      />
    );
  });
  const ingredient = findIngredient(id);
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
        <CSSTransition
          appear={true}
          in={ingredient ? true : false}
          timeout={500}
          classNames="loading-box"
        >
          <div>{details}</div>
        </CSSTransition>
        Add ingredient:
        <div className="ingredient-form">
          <IngredientForm onSave={onSave} />
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
