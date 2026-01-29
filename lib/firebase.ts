import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAxhccKbydM0BXxDRB8zKAUI5dryUfUB80",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "tonpredict.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "tonpredict",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "tonpredict.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "476711009288",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:476711009288:web:95f11010f8e73ace5065bd",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-7ZYTC34X85",
};

let app: FirebaseApp;
let auth: Auth;

function getFirebase() {
  if (typeof window === "undefined") {
    return { app: null, auth: null };
  }
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return { app, auth };
}

export function getFirebaseAuth(): Auth | null {
  return getFirebase().auth ?? null;
}
