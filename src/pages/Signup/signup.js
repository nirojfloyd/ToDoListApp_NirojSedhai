/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

// Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { signUp } from '../../context/Auth';
import logo from '../../../assets/login_image.jpg';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      // Clear the input fields
      setEmail('');
      setPassword('');
      // Display success message
      setSuccessMessage('You have successfully created the account. Proceed to login now');
    } catch (error) {
      // Handle signup error
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
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
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account?
        {' '}
        <Text style={styles.loginLink} onPress={navigateToLogin}>
          Login here
        </Text>
      </Text>
      {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
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
    border: '1px solid #ccc', // Add border style here
    borderRadius: 10, // Add border radius for rounded corners
  },
  logo: {
    width: 80, // Adjust the width and height as needed
    height: 80,
    marginBottom: 20,
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
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    color: 'blue', // Make the "Login here" text blue
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
});

export default Signup;
