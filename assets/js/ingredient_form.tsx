import React, { useState, SyntheticEvent } from "react";

interface Ingredient {
  name: string
};


const IngredientForm: React.FC<{}> = (props: {}) => {
  const [name, setName] = useState<string>("");
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    saveIngredient({name: name});
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const saveIngredient = (ingredient: Ingredient) => {
  fetch(
    `http://localhost:4000/api/ingredients`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ingredient: ingredient})
    }
  )
  .then(res => res.json())
  .then(response => {
    console.log(response);
    setName("")
  })
  .catch(error => console.log(error));

};
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default IngredientForm;
