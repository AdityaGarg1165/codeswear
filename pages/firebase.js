// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSObIF99kvBDqLu-UAJumjDG-EK_lH_Kc",
  authDomain: "codeswear.firebaseapp.com",
  projectId: "codeswear",
  storageBucket: "codeswear.appspot.com",
  messagingSenderId: "512066396467",
  appId: "1:512066396467:web:e865f86518a8d17a961e46",
  measurementId: "G-EGJ94Y16LV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
import React from 'react'

export default function Firebase() {
  return (
    <div>Firebase</div>
  )
}
