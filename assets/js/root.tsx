import React, { useState, useEffect } from "react";
import Ingredients from "./ingredients/ingredients";
import Recipes from "./recipes/recipes";
import { Ingredient, getIngredients } from "./ingredients/ingredients_api";
import { IngredientContext } from "./ingredients/context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

const Root = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    getIngredients().then((ingredients: Ingredient[]) => {
      setIngredients(ingredients);
    });
  }, []);
  return (
    <section className="phx-hero">
      <IngredientContext.Provider value={{ ingredients, setIngredients }}>
        <Router>
          <nav>
            <ul>
              <li>
                <NavLink to="/recipes">Recipes</NavLink>
              </li>
              <li>
                <NavLink to="/ingredients">Ingredients</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/ingredients/:id?">
              <Ingredients />
            </Route>
            <Route path="/recipes/:id?">
              <Recipes />
            </Route>
            <Route path="/">
              <Redirect to="/recipes/" />
            </Route>
          </Switch>
        </Router>
      </IngredientContext.Provider>
    </section>
  );
};

export default Root;
