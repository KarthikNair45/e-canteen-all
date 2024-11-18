import React, { useState,createContext } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { FoodContext } from '@/context/FoodContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { FoodItemsContext } from '@/context/FoodItems';

type FoodType = {
  id:number,
  name: string;
  imageUrl:string
};
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [foodSelected,setFoodSelected]=useState<number[]>([])
  const defaultFoodItem: FoodType[] = [{id: 9999999, name: "placeholder", imageUrl: "placeholderimg"}];
  const [foodItem,setFood]=useState<FoodType[]>(defaultFoodItem)
  return (
    <FoodContext.Provider value={{foodSelected,setFoodSelected}}>
      <FoodItemsContext.Provider value={{foodItem,setFood}}>
      <Stack>
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="student" options={{ headerShown: false }} />
      </Stack>
      </FoodItemsContext.Provider>
    </FoodContext.Provider>
  );
}
