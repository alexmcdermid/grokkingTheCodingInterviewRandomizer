import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const toast = useToast();

  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setCurrentUser(user);
      console.log(user)  
      toast({
        title: 'Sign-in successful',
        description: `Welcome ${user.displayName}! You're now signed in.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }).catch((error) => {
      console.error("Error during GitHub sign in:", error);
      toast({
        title: 'Sign-in failed',
        description: `Error: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const signOut = () => {
    toast({
      title: 'Sign-out successful',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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
