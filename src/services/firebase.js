import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAu9IxayiMSHr3jGvw024R_YR7myYVf-zE",
  authDomain: "chathub-1ab7b.firebaseapp.com",
  databaseURL: "https://chathub-1ab7b.firebaseio.com"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();