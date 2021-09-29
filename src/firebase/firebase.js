import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC8Sxu-NgzcQXc4v0-TTDQ74CD1FZE6Pno",
    authDomain: "announcement-9faf2.firebaseapp.com",
    projectId: "announcement-9faf2",
    storageBucket: "announcement-9faf2.appspot.com",
    messagingSenderId: "1003372153461",
    appId: "1:1003372153461:web:eae962ab5482914d4ec63c",
    measurementId: "G-EBHVV81T7C"
});

const db = firebaseApp.firestore();


export { db, firebaseApp };
