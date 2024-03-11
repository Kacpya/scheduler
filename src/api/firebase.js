// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDAAgS2tFEnYJODONtbx3bg8FF0RejCrak",
  authDomain: "schedulite-19ce6.firebaseapp.com",
  databaseURL: "https://schedulite-19ce6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "schedulite-19ce6",
  storageBucket: "schedulite-19ce6.appspot.com",
  messagingSenderId: "545439960941",
  appId: "1:545439960941:web:1b7502b55066218a82d464",
  measurementId: "G-NNCNW3Z7K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
