import { useFirebase } from './FirebaseContext';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const useLogClick = () => {
  const { db } = useFirebase();

  const logClick = async (linkId, userId) => {
    if (!userId) return;

    const clickData = {
      uid: userId,
      link: linkId,
      completed: false,
      clickedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "userProblemTracking"), clickData);
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  return logClick;
};