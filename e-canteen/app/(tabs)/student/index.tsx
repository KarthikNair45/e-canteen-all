import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, Image, FlatList, View } from "react-native";
import { Text } from "@/components/Themed";
import AddorMultiple from "@/components/AddorMultiple";
import { FoodItemsContext } from "@/context/FoodItems";

type FoodType = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function TabOneScreen() {
  const [foodItems, setFoodItems] = useState<FoodType[]>([]);
  const [searchField, setSearchField] = useState("");
  const useFoodContext = () => {
    const context = useContext(FoodItemsContext);
  
    if (!context) {
      throw new Error("useFoodContext must be used within a FoodProvider");
    }
  
    return context;
   } // Guaranteed to be of type FoodContextType
  const { foodItem, setFood } = useFoodContext();
  // Fetch food items from the backend
  const fetchFoodItems = async () => {
    try {
      const response = await fetch("https://sincerely-casual-trout.ngrok-free.app/food-items");
      const data: FoodType[] = await response.json();
      setFoodItems(data);
      console.log(data);
      setFood(data)
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };
  // Fetch the data when the component mounts
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const filteredFoodItems = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        placeholder="What would you like to eat today?"
        onChangeText={setSearchField}
        value={searchField}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredFoodItems}
        numColumns={3}
        renderItem={({ item: food }) => (
          <View key={food.id} style={styles.foodItem}>
            <Text>{food.name}</Text>
            <Image source={{ uri: food.imageUrl }} style={styles.foodImage} />
            <AddorMultiple id={food.id} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "90%",
    height: 40,
  },
  foodItem: {
    marginVertical: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
});
