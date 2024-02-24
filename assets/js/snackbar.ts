import { createContext, useContext } from "react";

type SnackBarMessenger = (content: string) => void;

export const SnackBarContext = createContext<SnackBarMessenger>(
  (_content: string) => console.warn("no funtion provided for content")
);
export const useSnackBar = () => useContext(SnackBarContext);
