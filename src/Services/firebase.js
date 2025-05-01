import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASBnFL1mBGA9a-vQvUXvv9i9XOFAuVrGI",
  authDomain: "atividadesomativa-a9655.firebaseapp.com",
  projectId: "atividadesomativa-a9655",
  storageBucket: "atividadesomativa-a9655.firebasestorage.app",
  messagingSenderId: "993595319752",
  appId: "1:993595319752:web:19b5a1fbd56821af9a8cfd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);

export { db, auth };