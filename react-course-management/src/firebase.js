import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCiMERpq5BhE5hsxPqHoPeOsu5qzybRhHY",
    authDomain: "react-task-d86b7.firebaseapp.com",
    projectId: "react-task-d86b7",
    storageBucket: "react-task-d86b7.appspot.com",
    messagingSenderId: "1037554269096",
    appId: "1:1037554269096:web:874935782745e865e0bb9d",
    measurementId: "G-WJNGJXDK40"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const db = getFirestore(app); 

export { auth, googleProvider, githubProvider, db };
