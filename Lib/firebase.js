
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqW3CtXrKccXeMBhzAQCm3BeGZwxXjrpo",
//   authDomain: "expense-36100.firebaseapp.com",
//   projectId: "expense-36100",
//   storageBucket: "expense-36100.firebasestorage.app",
//   messagingSenderId: "187941983770",
//   appId: "1:187941983770:web:2293b30734111dd735a3a3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db, app };




import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup ,
  initializeAuth, 
  getReactNativePersistence

} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  authDomain: "expense-36100.firebaseapp.com",
  projectId: "expense-36100",
  storageBucket: "expense-36100.firebasestorage.app",
  messagingSenderId: "187941983770",
  appId: "1:187941983770:web:2293b30734111dd735a3a3"
};

const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { 
  auth, 
  db, 
  app, 
  GoogleAuthProvider, 
  signInWithPopup 
};