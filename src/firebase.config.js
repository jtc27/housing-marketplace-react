// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//SDK database
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw0ZWtoZ7IZHWLsXgxVRp1hYbr6a-fuBY",
  authDomain: "house-marketplace-app-f5e6f.firebaseapp.com",
  projectId: "house-marketplace-app-f5e6f",
  storageBucket: "house-marketplace-app-f5e6f.appspot.com",
  messagingSenderId: "839264167268",
  appId: "1:839264167268:web:5f13d960b326c7865dc671"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export db = getFirestore()