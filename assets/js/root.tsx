import React, { useState, useEffect } from "react";
import Ingredients from "./ingredients/ingredients";
import Recipes from "./recipes/recipes";
import { Ingredient, getIngredients } from "./ingredients/ingredients_api";
import { IngredientContext } from "./ingredients/context";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
                <Link to="/">Recipes</Link>
              </li>
              <li>
                <Link to="/ingredients">Ingredients</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/ingredients">
              <Ingredients />
            </Route>
            <Route path="/">
              <Recipes />
            </Route>
          </Switch>
        </Router>
      </IngredientContext.Provider>
    </section>
  );
};

export default Root;
