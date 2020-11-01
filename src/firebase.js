import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./firebase.config";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Auth = firebase.auth();

export const Database = firebase.firestore();

export const Storage = firebase.storage().ref();
