import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyCMkgI_8lK7YkM1uuofu-YZ5eTJrzn4eHs",
    authDomain: "spacetagram-68139.firebaseapp.com",
    projectId: "spacetagram-68139",
    storageBucket: "spacetagram-68139.appspot.com",
    messagingSenderId: "22305478814",
    appId: "1:22305478814:web:bf19bf64ad9a711040838f",
    measurementId: "G-WDSY1JH5LJ"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);