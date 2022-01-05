import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import firestore from 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCAN0bn5KzDHfq20Rt5QhCCAxCJZzI1bv8",
    authDomain: "xpenditure-react-native-app.firebaseapp.com",
    projectId: "xpenditure-react-native-app",
    storageBucket: "xpenditure-react-native-app.appspot.com",
    messagingSenderId: "1023234856492",
    appId: "1:1023234856492:web:e0eb726c85160dab84a389"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;