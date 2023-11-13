import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyD2eLPAUwRzO0cMC1giTZpuTzgdSGcTf2U",
  authDomain: "grokkingthecodinginterviewr.firebaseapp.com",
  projectId: "grokkingthecodinginterviewr",
  storageBucket: "grokkingthecodinginterviewr.appspot.com",
  messagingSenderId: "885854526752",
  appId: "1:885854526752:web:b7ce998d3c59bded160b45",
  measurementId: "G-LRLFG100L2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const FirebaseProvider = ({ children }) => {
  const value = {
    app,
    analytics,
    db
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
