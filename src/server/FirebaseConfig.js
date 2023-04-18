///////////////
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDzCPwv8lCZ78XONsWXu8wR67z-OvzmAcc",
  authDomain: "foodapp-26170.firebaseapp.com",
  projectId: "foodapp-26170",
  storageBucket: "foodapp-26170.appspot.com",
  messagingSenderId: "389594430241",
  appId: "1:389594430241:web:d9c35ea063d10aa2c91c60",
  measurementId: "G-ETMH5FTDYY",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
