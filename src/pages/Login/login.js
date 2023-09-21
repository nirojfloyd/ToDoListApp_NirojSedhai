/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

// Login.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logIn } from '../../context/Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store login error
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleLogin = async () => {
    try {
      await logIn(email, password);

      // Navigate to the main app screen
      navigation.navigate('TodoList');
    } catch (error) {
      // Handle login error
      setError('Login failed. Please check your email and password.');
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup'); // Navigate to the Signup screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
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

      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
