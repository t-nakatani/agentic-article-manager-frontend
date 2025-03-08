"use client"

import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAPKNdkajNesM2u_HhKtnRg8EnNPKhRbIk",
  authDomain: "knowledge-pholio.firebaseapp.com",
  projectId: "knowledge-pholio",
  storageBucket: "knowledge-pholio.firebasestorage.app",
  messagingSenderId: "625394797685",
  appId: "1:625394797685:web:a02544a6c5cc63314cbc3c",
  measurementId: "G-SQVYV290KX",
}

// Initialize Firebase only if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Auth
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Initialize Analytics only in browser environment
let analytics = null
if (typeof window !== "undefined") {
  isSupported().then((yes) => yes && (analytics = getAnalytics(app)))
}

export { app, auth, googleProvider, analytics }

