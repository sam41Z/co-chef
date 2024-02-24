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
import { SnackBoxContext, useSnackBoxReducer } from "./snackbox";


const Root = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    getIngredients().then((ingredients: Ingredient[]) => {
      setIngredients(ingredients);
    });
  }, []);

  const {snacks, showSnack} = useSnackBoxReducer(5000);

  const snackBoxes = snacks.map((snack) => (
    <div key={snack.id} className="snackbox">
      {snack.snack}
    </div>
  ));

  return (
    <SnackBoxContext.Provider value={showSnack}>
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
          <div className="snackbox-container">
          {snackBoxes}
          </div>
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
    </SnackBoxContext.Provider>
  );
};

export default Root;
