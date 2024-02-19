import { initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3qexcQ8S2mDcBzjP3hTwoo5GI05kLPVo",
  authDomain: "first-webside-project.firebaseapp.com",
  databaseURL: "https://first-webside-project-default-rtdb.firebaseio.com",
  projectId: "first-webside-project",
  storageBucket: "first-webside-project.appspot.com",
  messagingSenderId: "516388342507",
  appId: "1:516388342507:web:630b8e049024dfb5580cae",
  measurementId: "G-MSE8EK4BPN",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage();
export const db = getFirestore();

