

//import the functions you need from the SDKs  you need

import {initializeApp, getApp, getApps} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// Firebase  configuration 
const firebaseConfig = {
    apiKey: "AIzaSyCqk1hIr50mS085COBpnQzhRRCLuMTjjds",
    authDomain: "linktunisia-11b2a.firebaseapp.com",
    projectId: "linktunisia-11b2a",
    storageBucket: "linktunisia-11b2a.appspot.com",
    messagingSenderId: "35655405546",
    appId: "1:35655405546:web:d54c565b8c00d2ae036c93"
  };


  //Initialize firebase
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore();
  const storage = getStorage();
  export default app;
  export {db,storage};