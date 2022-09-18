// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFV23eO8sBooLWEX7X-0fyf6YU6UIfSmk',
  authDomain: 'netflix-nextjs-d7177.firebaseapp.com',
  projectId: 'netflix-nextjs-d7177',
  storageBucket: 'netflix-nextjs-d7177.appspot.com',
  messagingSenderId: '750109852806',
  appId: '1:750109852806:web:099abc6e7470fdb7973d07',
  measurementId: 'G-BTJJJ8RB0N',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
