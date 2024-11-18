import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function UpdateStatusScreen() {
  const [status, setStatus] = useState("");
  const { order_id } = useLocalSearchParams(); // Get the order_id from the URL
  const router = useRouter();

  const handleUpdateStatus = () => {
    fetch("https://sincerely-casual-trout.ngrok-free.app/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: Number(order_id), // Include order_id in the payload
        status: status,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // On successful status update, navigate back to the orders screen
        router.back();
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Order Status</Text>
      <Text style={styles.subtitle}>Order ID: {order_id}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new status"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Update Status" onPress={handleUpdateStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
