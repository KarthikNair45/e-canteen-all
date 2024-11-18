import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Pressable } from 'react-native';

type FoodData = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function FoodManager() {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [action, setAction] = useState<'add' | 'update' | 'delete'>('add'); // Tracks selected action

  const handleSubmit = async () => {
    const foodData: FoodData = {
      id: parseInt(id, 10),
      name,
      imageUrl,
    };

    if (!foodData.id || (!foodData.name && action !== 'delete') || (!foodData.imageUrl && action !== 'delete')) {
      Alert.alert('Validation Error', 'All fields are required for Add or Update.');
      return;
    }

    let response;
    try {
      if (action === 'add') {
        response = await fetch('https://sincerely-casual-trout.ngrok-free.app/add-food', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(foodData),
        });
      } else if (action === 'update') {
        response = await fetch('https://sincerely-casual-trout.ngrok-free.app/update-food', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(foodData),
        });
      } else if (action === 'delete') {
        response = await fetch(`https://sincerely-casual-trout.ngrok-free.app/delete-food/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (response && response.ok) {
        Alert.alert('Success', `${action === 'add' ? 'Added' : action === 'update' ? 'Updated' : 'Deleted'} food item successfully!`);
      } else {
        Alert.alert('Error', `Failed to ${action} food item. Status: ${response?.status}`);
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred while trying to ${action} food item.`);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Action:</Text>
      <View style={styles.radioGroup}>
        <Pressable style={styles.radioButton} onPress={() => setAction('add')}>
          <View style={[styles.radioCircle, action === 'add' && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Add Food</Text>
        </Pressable>
        <Pressable style={styles.radioButton} onPress={() => setAction('update')}>
          <View style={[styles.radioCircle, action === 'update' && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Update Food</Text>
        </Pressable>
        <Pressable style={styles.radioButton} onPress={() => setAction('delete')}>
          <View style={[styles.radioCircle, action === 'delete' && styles.radioSelected]} />
          <Text style={styles.radioLabel}>Delete Food</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Food ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Food ID"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />

      {action !== 'delete' && (
        <>
          <Text style={styles.label}>Food Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Food Name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Image URL:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </>
      )}

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{action === 'add' ? 'Add' : action === 'update' ? 'Update' : 'Delete'} Food</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#777',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#007BFF',
  },
  radioLabel: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
