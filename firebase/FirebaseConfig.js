import * as firebase from 'firebase';



var config = {
    apiKey: "AIzaSyDRhXT8PNjcr4pLNHKlyNFgK54cbFx1D1w",
    authDomain: "react-native-blog-cf965.firebaseapp.com",
    databaseURL:"https://react-native-blog-cf965.firebaseio.com",
    projectId: "react-native-blog-cf965",
    storageBucket: "react-native-blog-cf965.appspot.com",
    messagingSenderId: "914370956555",
    appId: "1:914370956555:web:0f43914b58f9ee1c83660e",
    measurementId: "G-9P375WG0YX"
  };
  // Initialize Firebase

  export default (config = firebase.initializeApp(config));