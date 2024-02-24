export interface Ingredient {
  id?: number,
  name: string
}

export function postIngredient (ingredient: Ingredient) {
  return fetch(
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
  .catch(error => console.log(error));
}

export function getIngredients () {
  return fetch(
      `http://localhost:4000/api/ingredients`,
      {
        method: "GET"
      }
    )
    .then(res => res.json())
    .then(res => res.data)
    .catch(error => console.log(error));
}
