// lib/firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAq-gZc2SKZU8FSwr60EzgQMedF1LPxtkY",
    authDomain: "agrotech-33bf2.firebaseapp.com",
    projectId: "agrotech-33bf2",
    storageBucket: "agrotech-33bf2.firebasestorage.app",
    messagingSenderId: "414764683286",
    appId: "1:414764683286:web:4f7d488b84dd275e21a537"
};

const app: any = !getApps().length ? initializeApp(firebaseConfig) : getApp
export const auth = getAuth(app);
export const db = getFirestore(app);


