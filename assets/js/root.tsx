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
import { SnackBarContext } from "./snackbar";

const Root = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    getIngredients().then((ingredients: Ingredient[]) => {
      setIngredients(ingredients);
    });
  }, []);
  const [snacks, setSnacks] = useState<string[]>([])

  const showSnack = (snack: string) => {
    setSnacks([...snacks, snack]);
  };

  const snackBoxes = snacks.map(snack =>( <div className="snackbox">{snack}</div>));

  return (
    <SnackBarContext.Provider value={showSnack}>
      <IngredientContext.Provider value={{ ingredients, setIngredients }}>
        <Router>
          <nav>
            <ul>
              <li>
                <NavLink to="/recipes" activeClassName="nav-active">
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink to="/ingredients" activeClassName="nav-active">
                  Ingredients
                </NavLink>
              </li>
            </ul>
          </nav>
          {snackBoxes}
          <section>
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
          </section>
        </Router>
      </IngredientContext.Provider>
    </ErrorContext.Provider>
  );
};

export default Root;
