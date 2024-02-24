import React from "react";
import Ingredients from "./ingredients/ingredients";
import Recipes from "./recipes/recipes";

const Root = () => {
  return (
    <section className="phx-hero">
      <Recipes />
      <Ingredients />
    </section>
  );
};

export default Root;
