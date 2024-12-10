import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKkDPNiYAynFWG7At0xKb3xmSRBrgv8xs",
  authDomain: "chatapplication-f55d0.firebaseapp.com",
  databaseURL: "https://chatapplication-f55d0-default-rtdb.firebaseio.com",
  projectId: "chatapplication-f55d0",
  storageBucket: "chatapplication-f55d0.appspot.com",
  messagingSenderId: "770153085170",
  appId: "1:770153085170:web:b5d217bd075fe800eef86b",
  measurementId: "G-7763CJHYQK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); // Export database here
