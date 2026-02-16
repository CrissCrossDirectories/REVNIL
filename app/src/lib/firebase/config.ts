/**
 * Firebase Client SDK Configuration
 *
 * Reads Firebase project configuration from environment variables.
 * These values are set in .env.local for local development and
 * in the Firebase Hosting environment for production.
 *
 * IMPORTANT: These are client-side config values and are safe to
 * expose in the browser. They identify the Firebase project but
 * do not grant any privileged access.
 */
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Initialize Firebase app (singleton pattern).
 * Prevents re-initialization during hot module replacement in development.
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app, firebaseConfig };
