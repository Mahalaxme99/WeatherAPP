// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAwO__0k5zlmmb32FS5R0KYVPZut0-jZUc',
  authDomain: 'pockets-282da.firebaseapp.com',
  projectId: 'pockets-282da',
  messagingSenderId: 'noreply@pockets-282da.firebaseapp.com',
  appId: '1:933837127217:android:e9c606d31cbf678a225f10',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };