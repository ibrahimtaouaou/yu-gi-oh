// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUEglBLU_C-es_sB05_joSv5Gp0R3JkvA",

  authDomain: "yu-gi-oh-1cf75.firebaseapp.com",

  databaseURL:
    "https://yu-gi-oh-1cf75-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "yu-gi-oh-1cf75",

  storageBucket: "yu-gi-oh-1cf75.appspot.com",

  messagingSenderId: "108352935243",

  appId: "1:108352935243:web:5d10994169962a461d04ce",

  measurementId: "G-7L0BPJ2R4L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// firebaseApps previously initialized using initializeApp()
export const db = getFirestore();
connectFirestoreEmulator(db, "127.0.0.1", 8080);
