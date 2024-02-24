import React from "react";
import IngredientList from "./ingredients/ingredient_list.tsx";
import IngredientForm from "./ingredients/ingredient_form.tsx";

const Root: React.FC<{}> = (props: {}) => {
  return (
    <section className="phx-hero">
      <IngredientList/>
      <IngredientForm/>
    </section>
  );
};

export default Root;
