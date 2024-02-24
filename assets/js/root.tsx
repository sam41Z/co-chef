import React from "react";
import IngredientList from "./ingredient_list.tsx" 
import IngredientForm from "./ingredient_form.tsx"

const Root: React.FC<{}> = (props: {}) => {
  return (
    <section className="phx-hero">
      <h1>Welcome to the Root with Typescript and React!</h1>
      <p>Peace-of-mind from prototype to production</p>
      <IngredientList/>
      <IngredientForm/>
    </section>
  );
};

export default Root;
