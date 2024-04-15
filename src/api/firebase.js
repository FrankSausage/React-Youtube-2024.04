import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, updateProfile,
  signInWithPopup, signOut, signInWithEmailAndPassword,
  onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function register({ email, password, name, photo }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then (() => {
      updateProfile(auth.currentUser, { 
        displayName: name, 
        photoURL: photo,
      })
    })
    .then (() => {logout()})
    .catch(console.error);
}

export function login({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .then( result => result.user)
    .catch(console.error);
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
   signInWithPopup(auth, provider)
    .then( result => result.user)
    .catch(console.error);
}

export function logout() {
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
}

export function onUserStateChanged(callBack) {
  onAuthStateChanged(auth, (user) => {
    callBack(user);
  });
}