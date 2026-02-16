"use client";

import {
  GoogleAuthProvider,
  browserLocalPersistence,
  connectAuthEmulator,
  getIdToken,
  getIdTokenResult,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { app } from "@/lib/firebase/config";

let authInstance: ReturnType<typeof getAuth> | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

let authInitialized = false;

function getClientAuth() {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth client is only available in the browser.");
  }

  if (!authInstance) {
    authInstance = getAuth(app);
  }

  return authInstance;
}

function getGoogleProvider() {
  if (!googleProviderInstance) {
    googleProviderInstance = new GoogleAuthProvider();
  }

  return googleProviderInstance;
}

export async function initializeClientAuth(): Promise<void> {
  if (authInitialized) {
    return;
  }

  const auth = getClientAuth();

  await setPersistence(auth, browserLocalPersistence);

  if (
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true" &&
    typeof window !== "undefined"
  ) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
      disableWarnings: true,
    });
  }

  authInitialized = true;
}

export async function signInWithEmailPassword(
  email: string,
  password: string
): Promise<User> {
  const auth = getClientAuth();
  await initializeClientAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signInWithGoogleProvider(): Promise<User> {
  const auth = getClientAuth();
  const googleProvider = getGoogleProvider();
  await initializeClientAuth();
  const credential = await signInWithPopup(auth, googleProvider);
  return credential.user;
}

export async function signOutUser(): Promise<void> {
  const auth = getClientAuth();
  await signOut(auth);
}

export async function getCurrentUserIdToken(
  forceRefresh: boolean = false
): Promise<string | null> {
  const auth = getClientAuth();
  if (!auth.currentUser) {
    return null;
  }

  return getIdToken(auth.currentUser, forceRefresh);
}

export async function getCurrentUserTokenResult(
  forceRefresh: boolean = false
) {
  const auth = getClientAuth();
  if (!auth.currentUser) {
    return null;
  }

  return getIdTokenResult(auth.currentUser, forceRefresh);
}

export function getAuthInstance() {
  return getClientAuth();
}
