import { useState, useEffect } from "react";
import { Ingredient, getIngredients } from "./ingredients_api";
import { useSnackBox } from "../snackbox";

const useIngredients = () => {
  const sendSnack = useSnackBox();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const fetchIngredients = () => {
    getIngredients()
      .then((response: Ingredient[]) => {
        setIngredients(response);
      })
      .catch((error) => {
        sendSnack("Unable to fetch ingredients!");
        console.log(error);
      });
  };
  useEffect(() => {
    fetchIngredients();
  }, []);
  return { ingredients, fetchIngredients };
};

export default useIngredients;
