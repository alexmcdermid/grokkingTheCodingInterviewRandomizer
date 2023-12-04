import { useFirebase } from './FirebaseContext';
import { collection, addDoc, serverTimestamp, getDoc } from "firebase/firestore";

export const useLogClick = () => {
  const { db } = useFirebase();

  const logClick = async (linkId, questionDifficulty,  userId, email) => {
    if (!userId) return;

    const clickData = {
      uid: userId,
      link: linkId,
      question_difficulty: questionDifficulty,
      user_email: email,
      completed_at: null,
      clickedAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "userProblemTracking"), clickData);
      const newDoc = await getDoc(docRef);
      const clickedAt = newDoc.data().clickedAt;

      return clickedAt
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  return logClick;
};
