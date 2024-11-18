import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
type OrderItem ={
    id: number;
    imageUrl: string;
    name: string;
    quantity: number;
  }
  
  type Order ={
    order_id: number;
    status: string;
    student_id: number;
    items: OrderItem[];
  }
  
const StudentOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Use the Order type

  useEffect(() => {
    // Fetch student's orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://sincerely-casual-trout.ngrok-free.app/past-orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: 1 }), // Replace with dynamic student_id
        });
        const data: Order[] = await response.json(); // Explicitly type the response as Order[]
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={({ item: order }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
            <Text style={styles.status}>Status: {order.status}</Text>
            <Text style={styles.subTitle}>Items:</Text>
            <FlatList
              data={order.items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: food }) => (
                <View style={styles.foodItem}>
                  <Image source={{ uri: food.imageUrl }} style={styles.foodImage} />
                  <View>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text>Quantity: {food.quantity}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  orderCard: { marginBottom: 20, padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  orderId: { fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 16, color: "#555", marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  foodItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  foodImage: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  foodName: { fontSize: 16, fontWeight: "bold" },
});

export default StudentOrdersScreen;
