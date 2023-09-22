/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login/login';
import Signup from './src/pages/Signup/signup';
import TodoList from './src/components/ToDoList';
import { AppProvider } from './src/context/AppContext';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="TodoList" component={TodoList} />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
