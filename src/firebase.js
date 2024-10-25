import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5notERaogriNXlLKGBcE5821PT0lm6Lc",
  authDomain: "create-react-1ba93.firebaseapp.com",
  projectId: "create-react-1ba93",
  storageBucket: "create-react-1ba93.appspot.com",
  messagingSenderId: "82526035901",
  appId: "1:82526035901:web:e5ab592a041bafe9c2bcd4",
  measurementId: "G-1KDKSWNE99"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


const database = getDatabase(app);

export { ref, set, push, onValue, get };
export default database;
