import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // Handle the signed in user
    }).catch((error) => {
      // Handle errors
    });
  };

  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    signInWithGitHub,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
