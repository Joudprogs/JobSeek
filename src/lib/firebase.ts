  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCyhUqe_iFwYCXHpHVefuRIe8HZl8GYFhk",
      authDomain: "jobseek-c2ca0.firebaseapp.com",
      projectId: "jobseek-c2ca0",
      storageBucket: "jobseek-c2ca0.firebasestorage.app",
      messagingSenderId: "314215842037",
      appId: "1:314215842037:web:1e8d03d8e9588e9f1905bc"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);