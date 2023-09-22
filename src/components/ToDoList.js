/* eslint-disable no-useless-catch */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

// TodoList.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { useNavigation } from '@react-navigation/native';
import { addTask, updateTask, getTasksByUser, deleteTask } from './taskService';
import { useAppContext } from '../context/AppContext';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { user, logOut } = useAppContext();
  const navigation = useNavigation();
  const [filter, setFilter] = useState('all'); // Track filter option (all, active, completed)
  const [sort, setSort] = useState('default'); // Track sort option (default, alphabetical)
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    // Load tasks associated with the user when the component mounts
    if (user) {
      loadTasks(user.uid);
    }
  }, [user]);

  useEffect(() => {
    // Apply filter and sort when tasks or filter/sort options change
    filterAndSortTasks();
  }, [tasks, filter, sort]);

  const handleLogOut = async () => {
    try {
      await logOut(); // Log the user out

      // Navigate to the "Login" screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const loadTasks = async (userId) => {
    try {
      // Load tasks associated with the user
      const userTasks = await getTasksByUser(userId);
      setTasks(userTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTaskToFirestore = async (title) => {
    try {
      // Add the task to Firestore with the user's ID
      const taskId = await addTask(title, user.uid);

      // Create a new task object and add it to the local state
      const newTask = { id: taskId, title, completed: false };
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      // Toggle the completion status of the task in Firestore
      await updateTask(taskId, { completed: !tasks.find((task) => task.id === taskId).completed });

      // Update the local state to reflect the new task status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  // Function to delete a task in Firestore
  const deleteTaskInFirestore = async (taskId) => {
    try {
      // Delete the task from Firestore
      await deleteTask(taskId);

      // Remove the task from the local state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to start editing a task
  const startEditingTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  // Function to save the edited task in Firestore
  const saveEditedTaskInFirestore = async (taskId, newText) => {
    try {
      // Save the edited task in Firestore
      await updateTask(taskId, { title: newText });

      // Update the local state with the edited task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, title: newText } : task))
      );

      // Clear the editing task ID
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error saving edited task:', error);
    }
  };

  const filterAndSortTasks = () => {
    console.log('Filter:', filter); // Debugging: Log the current filter
    console.log('Sort:', sort); // Debugging: Log the current sort

    let filteredTasks = [...tasks];

    // Apply filter
    if (filter === 'active') {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    }

    // Apply sort
    if (sort === 'alphabetical') {
      filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    }

    console.log('Filtered Tasks:', filteredTasks); // Debugging: Log the filtered tasks

    setFilteredTasks(filteredTasks);
  };

  const renderTaskItem = ({ item }) => {
    const isEditing = editingTaskId === item.id;

    return (
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => toggleTaskStatus(item.id)}>
          <Ionicons
            name={item.completed ? 'checkbox' : 'checkbox-outline'}
            size={24}
            color={item.completed ? 'green' : 'black'}
          />
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={[styles.taskTitle, item.completed && styles.completedText]}
            value={item.title}
            onChangeText={(text) => saveEditedTaskInFirestore(item.id, text)}
            autoFocus
            onBlur={() => setEditingTaskId(null)}
          />
        ) : (
          <Text
            style={[styles.taskTitle, item.completed && styles.completedText]}
            onPress={() => startEditingTask(item.id)}
          >
            {item.title}
          </Text>
        )}

        <TouchableOpacity onPress={() => deleteTaskInFirestore(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFilterButton = (text, filterOption) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterOption && styles.activeFilterButton]}
      onPress={() => setFilter(filterOption)}
    >
      <Text style={styles.filterButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  const renderSortButton = (text, sortOption) => (
    <TouchableOpacity
      style={[styles.sortButton, sort === sortOption && styles.activeSortButton]}
      onPress={() => setSort(sortOption)}
    >
      <Text style={styles.sortButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={taskText}
          onChangeText={(text) => setTaskText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTaskToFirestore(taskText)}>
          <Text style={styles.addButtonLabel}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Filter and sort controls */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtons}
        >
          {renderFilterButton('All', 'all')}
          {renderFilterButton('Active', 'active')}
          {renderFilterButton('Completed', 'completed')}
        </ScrollView>
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.filterText}>Sort:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortButtons}
        >
          {renderSortButton('Default', 'default')}
          {renderSortButton('Alphabetical', 'alphabetical')}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskList}
        initialScrollIndex={0}
      />
      <Button title="Log Out" onPress={handleLogOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 16,
    marginRight: 10,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilterButton: {
    backgroundColor: 'lightgrey', // Change the background color for the active filter
  },
  filterButtonText: {
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeSortButton: {
    backgroundColor: 'lightgrey', // Change the background color for the active sort
  },
  sortButtonText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  taskTitle: {
    flex: 1,
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  logOutButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TodoList;
