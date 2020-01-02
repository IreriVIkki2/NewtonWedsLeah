// import config from "../config/config";
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const firebaseConfig = require("../config").firebaseConfig;

let db, auth;

try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
    }
}

module.exports = { db, auth, firebase };
