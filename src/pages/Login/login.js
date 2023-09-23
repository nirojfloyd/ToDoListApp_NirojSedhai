/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

// Login.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logIn } from '../../context/Auth';
import logo from '../../../assets/login_image.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store login error
  const navigation = useNavigation();

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
      <Image source={logo} style={styles.logo} />
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Donot have an account?
        {' '}
        <Text style={styles.signupLink} onPress={navigateToSignup}>
          Signup here
        </Text>
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 10,
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
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#007acc',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
});

export default Login;
