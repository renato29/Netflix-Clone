import firebase from 'firebase' ;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2adJ-eU0bmNsiPUHEl4NAm9_xNQm2H8k",
    authDomain: "netflix-clone-6dc8b.firebaseapp.com",
    projectId: "netflix-clone-6dc8b",
    storageBucket: "netflix-clone-6dc8b.appspot.com",
    messagingSenderId: "745588817418",
    appId: "1:745588817418:web:aea81eeb9da681e6fb29f3",
    measurementId: "G-H509E8J6HK"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth}; 
export default db ; 