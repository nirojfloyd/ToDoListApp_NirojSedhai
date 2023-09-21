/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

// Login.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleLogin = () => {
    // Implement Firebase authentication logic here
    // If login is successful, navigate to the todo list screen
    // If login fails, handle errors

    navigation.navigate('TodoList');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup'); // Navigate to the Signup screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={navigateToSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Login;
