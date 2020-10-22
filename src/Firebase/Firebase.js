import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGzf5C6_ZBd4Y5i9WjaQxd-Jbwc94ovvM",
    authDomain: "task-manager-4dee4.firebaseapp.com",
    databaseURL: "https://task-manager-4dee4.firebaseio.com",
    projectId: "task-manager-4dee4",
    storageBucket: "task-manager-4dee4.appspot.com",
    messagingSenderId: "125380233283",
    appId: "1:125380233283:web:56f8c745f1499c9b336cf6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;