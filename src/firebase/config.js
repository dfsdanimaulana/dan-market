import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAyB_AC9EBGp_izkBWA09FS6L6L80rKxiQ",
  authDomain: "dan-market.firebaseapp.com",
  projectId: "dan-market",
  storageBucket: "dan-market.appspot.com",
  messagingSenderId: "122480376267",
  appId: "1:122480376267:web:953a707255cc55ff12de4e"
}

firebase.initializeApp(firebaseConfig)

// init firestore
const db = firebase.firestore()

// init authentication
const auth = firebase.auth()

// init storage
const storage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, storage, timestamp }