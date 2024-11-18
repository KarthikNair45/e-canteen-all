import { createContext } from "react";
type FoodType = {
    id:number,
    name: string;
    imageUrl:string
  };
type FoodContextType={
    foodItem:FoodType[];
    setFood:React.Dispatch<React.SetStateAction<FoodType[]>>;
}
export const FoodItemsContext = createContext<FoodContextType | undefined>(undefined);