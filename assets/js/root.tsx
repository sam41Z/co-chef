import React from "react";
import IngredientList from "./ingredients/ingredient_list";
import IngredientForm from "./ingredients/ingredient_form";

const Root: React.FC<{}> = () => {
  return (
    <section className="phx-hero">
      <IngredientList />
      <IngredientForm />
    </section>
  );
};

export default Root;
