// config.js

import { initializeApp } from '@firebase/app';
import { getStorage, ref } from '@firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmNe40cffXoTRm-vi8bznMtS6i_JyQQYw",
  authDomain: "socialmediaproduction-70b0a.firebaseapp.com",
  projectId: "socialmediaproduction-70b0a",
  storageBucket: "socialmediaproduction-70b0a.appspot.com",
  messagingSenderId: "381877450135",
  appId: "1:381877450135:web:e3a72d26026820963240d2"
};

const firebaseApp = initializeApp(firebaseConfig);
let storage = getStorage(firebaseApp);
storage = ref(storage,'/')
//console.log('STORAGE---------------', ref(storage, '/'));  // Use ref function to get the root reference

export { storage };
