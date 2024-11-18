import { createContext } from "react";
type FoodContextType = {
    foodSelected: number[];
    setFoodSelected: React.Dispatch<React.SetStateAction<number[]>>;
  };
  
export const FoodContext = createContext<FoodContextType | undefined>(undefined);