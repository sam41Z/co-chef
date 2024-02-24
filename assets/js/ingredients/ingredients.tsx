import React, { useEffect } from "react";
import "./ingredients.scss";
import {
  Ingredient as IngredientType,
  getIngredients,
  deleteIngerdient,
} from "./ingredients_api";
import NamedItem from "../named_item";
import IngredientForm from "./ingredient_form";
import { useIngredients } from "./context";
import { useParams } from "react-router-dom";
import ContentBox from "../content_box";
import IngredientInfo from "./ingredient_info";
import { CSSTransition } from "react-transition-group";
import { useSnackBox } from "../snackbox";

const Ingredients = () => {
  const { ingredients, setIngredients } = useIngredients();
  const { id } = useParams<{ id?: string }>();
  const basePath = "/ingredients/";
  const sendSnack = useSnackBox();

  const fetchIngredients = () => {
    getIngredients()
      .then((response: IngredientType[]) => {
        setIngredients(response);
      })
      .catch((error) => {
        sendSnack("Unable to fetch ingredients!");
        console.log(error);
      });
  };
  useEffect(() => {
    fetchIngredients();
  }, []);

  const findIngredient = (id?: number | string) =>
    ingredients.find((item) => item.id === Number(id));

  const onClickDelete = (id: number) => {
    deleteIngerdient(id)
      .then(() => fetchIngredients())
      .catch((error) => {
        sendSnack("Unable to delete ingredient");
        console.log(error);
      });
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
  const ingredientInfo = ingredient && (
    <IngredientInfo ingredient={ingredient} />
  );
  return (
    <ContentBox>
      {{
        left: <ul>{items}</ul>,
        right: (
          <div>
            <CSSTransition
              appear={true}
              in={ingredient ? true : false}
              timeout={500}
              classNames="loading-box"
            >
              <div>{ingredientInfo}</div>
            </CSSTransition>
            Add ingredient:
            <div className="ingredient-form">
              <IngredientForm onSave={onSave} />
            </div>
          </div>
        ),
      }}
    </ContentBox>
  );
};

export default Ingredients;
