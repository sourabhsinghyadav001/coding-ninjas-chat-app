import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBu-jHkNUjdojP2mvHFI1LB_NRRDjNXh3g",
  authDomain: "codingninjaschatapp.firebaseapp.com",
  projectId: "codingninjaschatapp",
  storageBucket: "codingninjaschatapp.appspot.com",
  messagingSenderId: "100139742791",
  appId: "1:100139742791:web:9b9a0810dc43691e7e6362",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
