
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const fbConfig = {
    apiKey: import.meta.FIREBASE_API_KEY,
    authDomain: "sm-qa-vue.firebaseapp.com",
    databaseURL: "https://sm-qa-vue-default-rtdb.firebaseio.com",
    projectId: "sm-qa-vue",
    storageBucket: "sm-qa-vue.appspot.com",
    messagingSenderId: "452096043211",
    appId: "1:452096043211:web:6c7d346c01cf9fe3da134e"
}

export const firebaseApp = initializeApp(fbConfig)
export const db = getFirestore(firebaseApp)