import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAAf9D-DsZIbJ2YahJ-J6sohjGqePQMGXM",
    authDomain: "todolist-app-5acc0.firebaseapp.com",
    projectId: "todolist-app-5acc0",
    storageBucket: "todolist-app-5acc0.appspot.com",
    messagingSenderId: "734719169409",
    appId: "1:734719169409:web:22d9667c608284e8b2ce80"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)