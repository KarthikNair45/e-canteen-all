import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native"; // Ensure this is installed

interface OrderItem {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
}

interface Order {
  order_id: number;
  status: string;
  student_id: number;
  items: OrderItem[];
}

const AdminOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://sincerely-casual-trout.ngrok-free.app/get-all-orders");
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders(); // Fetch orders whenever the screen is focused
    }, [])
  );

  const handleOrderPress = (order_id: number) => {
    router.push({
      pathname: "/updatestatus",
      params: { order_id: order_id.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={({ item: order }) => (
          <TouchableOpacity onPress={() => handleOrderPress(order.order_id)} style={styles.orderCard}>
            <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
            <Text style={styles.status}>Status: {order.status}</Text>
            <Text style={styles.studentId}>Student ID: {order.student_id}</Text>
            <Text style={styles.itemsTitle}>Items:</Text>
            {order.items.map((item) => (
              <Text key={item.id}>
                - {item.name} (x{item.quantity})
              </Text>
            ))}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  orderCard: { padding: 15, marginBottom: 10, borderWidth: 1, borderRadius: 8, borderColor: "#ddd" },
  orderId: { fontSize: 18, fontWeight: "bold" },
  status: { fontSize: 16, marginTop: 5 },
  studentId: { fontSize: 16, marginTop: 5 },
  itemsTitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
});

export default AdminOrdersScreen;
