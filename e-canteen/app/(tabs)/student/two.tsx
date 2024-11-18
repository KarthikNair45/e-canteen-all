import { StyleSheet, FlatList, Image, Alert } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { Button } from 'react-native';
import AddorMultiple from '@/components/AddorMultiple';
import { Text, View } from '@/components/Themed';
import { FoodContext } from '@/context/FoodContext';
import { FoodItemsContext } from '@/context/FoodItems';

type Counts = { [key: string]: number };
export default function TabTwoScreen() {

  const sendOrderData = async (counter: Counts) => {
    const orderData = {
      student_id: 1, // Unique ID for the student
      orders: counter, // Food ID and their respective quantities
      status: "Received"
    };
  
    try {
      const response = await fetch('https://sincerely-casual-trout.ngrok-free.app/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Your order has been placed successfully!');
      } else {
        Alert.alert('Error', `Failed to place order. Status: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred: ${error}`);
    }
  };
  const [counter, setCounter] = useState<Counts>({});
  // Custom hook for FoodContext
  const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (!context) {
      throw new Error("useFoodContext must be used within a FoodProvider");
    }
    return context; // Guaranteed to be of type FoodContextType
  };
  const { foodSelected } = useFoodContext();

  // Update counter based on foodSelected
  useEffect(() => {
    const newCounter: Counts = {};
    foodSelected.forEach(ele => {
      newCounter[ele] = (newCounter[ele] || 0) + 1;
    });
    setCounter(newCounter);
  }, [foodSelected]);

  console.log(counter);

  // Custom hook for FoodItemsContext
  const useFoodItemContext = () => {
    const context = useContext(FoodItemsContext);
    if (!context) {
      throw new Error("useFoodContext must be used within a FoodProvider");
    }
    return context; // Guaranteed to be of type FoodContextType
  };
  const { foodItem } = useFoodItemContext();

  // Convert counter object to a list of food keys
  const foodKeys = Object.keys(counter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={foodKeys}
        numColumns={3}
        renderItem={({ item: food }) => (
          <View key={food} style={styles.foodItem}>
            <Text>{foodItem[Number(food)].name}</Text>
            <Image source={{ uri: foodItem[Number(food)].imageUrl }} style={styles.foodImage} />
            <AddorMultiple id={Number(food)} />
          </View>
        )}
        keyExtractor={(item) => item}
      />
      <Button title='Place Order' onPress={()=>sendOrderData(counter)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  foodItem: {
    marginVertical: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  foodImage: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
});
