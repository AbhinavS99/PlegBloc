require('dotenv').config({
    path: '../.env'
});

import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
};

// Initialize Firebase
if (!firebase.app.initializeApp) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firebase();
const storage = firebase.storage();


export {firebase, auth, db, storage};