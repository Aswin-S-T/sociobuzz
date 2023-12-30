import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyCmNe40cffXoTRm-vi8bznMtS6i_JyQQYw",
    authDomain: "socialmediaproduction-70b0a.firebaseapp.com",
    projectId: "socialmediaproduction-70b0a",
    storageBucket: "socialmediaproduction-70b0a.appspot.com",
    messagingSenderId: "381877450135",
    appId: "1:381877450135:web:e3a72d26026820963240d2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}