/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

// Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { signUp } from '../../context/Auth';

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
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Back to Login" onPress={navigateToLogin} />
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
});

export default Signup;
