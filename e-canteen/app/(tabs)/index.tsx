import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signIn = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter all fields');
    } else {
      // Placeholder for actual authentication logic
      Alert.alert('Success', 'You have signed in!');
      if (username=='student'){
        router.push('/student');
      }
      else if(username=='admin'){
        router.push('/admin')
      } // Example navigation after sign-in
    }
  };

  const handleSignUp = () => {
    router.push('/(tabs)signup'); // Navigate to Sign Up page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={signIn} />
      <Text style={styles.link} onPress={handleSignUp}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  link: {
    marginTop: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
