// UpdateQuestionStatus.js
import { useFirebase } from './FirebaseContext';
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";

export const useUpdateQuestionStatus = () => {
  const { db } = useFirebase();

  const updateQuestionStatus = async (href, startedAt, completed) => {
    try {
      const q = query(collection(db, "userProblemTracking"), where("link", "==", href), where("clickedAt", "==", startedAt));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          completed_at: completed ? serverTimestamp() : null
        });
      }
    } catch (error) {
      console.error("Error updating question status:", error);
    }
  };

  return updateQuestionStatus;
};
