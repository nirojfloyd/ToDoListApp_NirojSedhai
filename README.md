# React Native To-Do List App

This is a simple to-do list app developed using React Native. The app allows users to create, edit, delete, and mark tasks as complete. It provides filtering and sorting options, user registration and login via Firebase Authentication, and data storage in Cloud Firestore. The app has been designed for both Android and iOS platforms.

## Screenshots


<!-- Login Page -->
<img src="https://github.com/nirojfloyd/ToDoListApp_NirojSedhai/blob/master/assets/screenshots/loginpage.jpg" alt="Login Page" width="300"/>

<!-- Signup Page -->
<img src="https://github.com/nirojfloyd/ToDoListApp_NirojSedhai/blob/master/assets/screenshots/signuppage.jpg" alt="Signup Page" width="300"/>

<!-- Todo Page 1 -->
<img src="https://github.com/nirojfloyd/ToDoListApp_NirojSedhai/blob/master/assets/screenshots/todopage1.jpg" alt="Todo Page 1" width="300"/>

<!-- Todo Page 2 -->
<img src="https://github.com/nirojfloyd/ToDoListApp_NirojSedhai/blob/master/assets/screenshots/todopage2.jpg" alt="Todo Page 2" width="300"/>

<!-- Todo Page 3 -->
<img src="https://github.com/nirojfloyd/ToDoListApp_NirojSedhai/blob/master/assets/screenshots/todopage3.jpg" alt="Todo Page 3" width="300"/>

<!-- Todo Page 4 -->
<img src="https://github.com/nirojfloyd/ToDoListApp_NirojSedhai/blob/master/assets/screenshots/todopage4.jpg" alt="Todo Page 4" width="300"/>


## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributor](#contributor)
- [License](#license)

## Features

- **Task Management**: Users can create, edit, and delete tasks effortlessly.
- **Task Completion**: Tasks can be marked as complete or incomplete.
- **List Filtering**: Users can filter tasks by status (all, active, completed).
- **List Sorting**: Tasks can be sorted alphabetically.
- **User Authentication**: Firebase Authentication handles user registration and login.
- **Data Storage**: Task data is stored securely in Firebase.
- **Cross-Platform**: The app has been tested on both Android and iOS devices.
- **User-Friendly Interface**: The app offers an intuitive and visually appealing user interface.



## Technology Stack

- Frontend:
  - React Native
<br></br>
- Backend:
  - Firebase
    - Cloud Firestore
    - Authentication
<br></br>
- Development Tools:
  - Expo CLI
  - Visual Studio Code as IDE
<br></br>
- Version Control
  - Git

## Installation
Before running the app, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

1. **Clone the repository:**

   ```shell
   git clone https://github.com/nirojfloyd/ToDoListApp_NirojSedhai.git
   ```

2. **Install dependencies for the project:**

   ```shell
   cd ToDoListApp_NirojSedhai
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Configure Firebase Authentication, Firestore Database, and Firebase Storage according to your needs.
   - Update the Firebase configuration in the appropriate files (e.g., `.env` or `firebase-config.js`) in the given directory.

## Usage

1. **Start the project:**

   ```shell
   npx expo start
   ```

2. **Use the Expo Go app on your Android/iOS device to scan the QR code and run the app.**

## Contributor

- [Niroj Sedhai](https://github.com/nirojfloyd)


## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed.
