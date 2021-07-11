import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAmINToAZkak8GLsGbcgNPVaudVY-x-2pk",
  authDomain: "hmstocktable.firebaseapp.com",
  projectId: "hmstocktable",
  storageBucket: "hmstocktable.appspot.com",
  messagingSenderId: "169838509574",
  appId: "1:169838509574:web:98d59c102d7889b0ef0d87",
  measurementId: "G-25ZBBMLSTW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider, db };
