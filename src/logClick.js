import { useContext } from 'react';
import { useFirebase } from './FirebaseContext';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const useLogClick = () => {
  const { db } = useFirebase;

  const logClick = async (linkId, userId) => {
    if (!userId) return;

    const clickData = {
      userId,
      link: linkId,
      clickedAt: serverTimestamp()
    };

    try {
      const docRef = doc(db, "userProblemTracking", `${Date.now()}-${userId}`);
      await setDoc(docRef, clickData);
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  return logClick;
};
