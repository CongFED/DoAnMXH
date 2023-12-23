import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAJGa3cScsKhZMb0Gxu_qchz-Y4C7DD2RU",
//   authDomain: "chatreactjs-19e92.firebaseapp.com",
//   databaseURL: "https://chatreactjs-19e92-default-rtdb.firebaseio.com",
//   projectId: "chatreactjs-19e92",
//   storageBucket: "chatreactjs-19e92.appspot.com",
//   messagingSenderId: "193233299031",
//   appId: "1:193233299031:web:a78bc3fa799cb3b8ac2512",
//   measurementId: "G-9QHYXM9EMS",
// };
const firebaseConfig = {
  apiKey: "AIzaSyB1Ts_BGQRpwXUh8yeIpUFqoDeq7-6Bir4",
  authDomain: "chaapprj.firebaseapp.com",
  projectId: "chaapprj",
  storageBucket: "chaapprj.appspot.com",
  messagingSenderId: "339597109735",
  appId: "1:339597109735:web:02b74cb551515e2d3ef542",
  measurementId: "G-LX4VXQ7VL0"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
