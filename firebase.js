// ✅ FIREBASE (BROWSER CDN VERSION)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCZRO5jSmXbGgBVhdnAIJvU01O9Z3u2k6M",
  authDomain: "masterclass047.firebaseapp.com",
  projectId: "masterclass047",
  storageBucket: "masterclass047.firebasestorage.app",
  messagingSenderId: "716287552918",
  appId: "1:716287552918:web:f0b02a38fd76f8048a81b7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);