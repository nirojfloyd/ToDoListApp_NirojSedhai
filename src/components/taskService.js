/* eslint-disable no-useless-catch */

import {
  collection, deleteDoc, addDoc, updateDoc, getDocs, doc, query, where,
} from 'firebase/firestore';
import { db } from '../../firebase-config';

// Add a new task to Firestore
export const addTask = async (title, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      title,
      userId,
      completed: false,
    });
    return docRef.id; // Return the ID of the newly created task
  } catch (error) {
    throw error;
  }
};

// Update a task in Firestore
export const updateTask = async (taskId, data) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, data);
  } catch (error) {
    throw error;
  }
};

// Delete a task in Firestore
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    throw error;
  }
};

// Retrieve all tasks for a specific user from Firestore
export const getTasksByUser = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'tasks'), where('userId', '==', userId)),
    );

    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return tasks;
  } catch (error) {
    throw error;
  }
};
