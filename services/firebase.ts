import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6g6NoUzTCP3JyVcLbdP9JJ8v9_wE9qWQ",
  authDomain: "nim-project-20446.firebaseapp.com",
  projectId: "nim-project-20446",
  storageBucket: "nim-project-20446.firebasestorage.app",
  messagingSenderId: "546954546167",
  appId: "1:546954546167:web:2239042e70dd789f0ebcf2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


