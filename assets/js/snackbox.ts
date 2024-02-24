import { createContext, useContext, useReducer } from "react";
import Lists from "./lists";

type SnackBoxMessenger = (content: string) => void;

type Snack = {
  snack: string;
  id: number;
};
type Action = {
  type: "add" | "remove";
  payload: Snack;
};

const reducer = (snacks: Snack[], action: Action): Snack[] => {
  switch (action.type) {
    case "add":
      return Lists.add(snacks, action.payload);
    case "remove":
      return Lists.remove(snacks, action.payload, (a, b) => a.id == b.id);
    default:
      return snacks;
  }
};
export const SnackBoxContext = createContext<SnackBoxMessenger>(
  (_content: string) => console.warn("no funtion provided for content")
);
export const useSnackBox = () => useContext(SnackBoxContext);
export const useSnackBoxReducer = (time: number) => {
  const [snacks, dispatch] = useReducer(reducer, []);

  const showSnack = (snack: string) => {
    const id = Math.floor(Math.random() * 10000);
    const item = { snack: snack, id: id };
    dispatch({ type: "add", payload: item });
    setTimeout(() => {
      dispatch({ type: "remove", payload: item });
    }, time);
  };

  return {snacks, showSnack};
};
