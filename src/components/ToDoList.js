/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

// TodoList.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Function to add a new task to the list
  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: taskText, completed: false }]);
      setTaskText('');
    }
  };

  // Function to toggle the completion status of a task
  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId
      ? { ...task, completed: !task.completed } : task)));
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const startEditingTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const saveEditedTask = (taskId, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId
      ? { ...task, title: newText } : task)));
    setEditingTaskId(null);
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
            onChangeText={(text) => saveEditedTask(item.id, text)}
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

        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={taskText}
          onChangeText={(text) => setTaskText(text)}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default TodoList;
