//import all relevant items from firebase
import { initializeApp } from "firebase/app";
import {
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged 
} from "firebase/auth"; 

const auth = getAuth(firebaseApp);


function signUp(email, password) { 
    return auth.createUserWithEmailAndPassword(email, password);
  }
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  
  function logOut() {
    return auth.signOut();
  }

  
    function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }

  export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };

