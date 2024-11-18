import React, { useState,createContext } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
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
  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Food',
            tabBarIcon: ({ color }) => <TabBarIcon name="spoon" color={color} />,
            
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: '  Cart',
            tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
            headerRight: () => (
              <Link href="/(tabs)/student/pastorders" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="history"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="pastorders"
          options={{
            title: 'Past Orders',
            tabBarIcon: ({ color }) => <TabBarIcon name="spoon" color={color} />,
            
          }}
        />
        
      </Tabs>
  );
}
