// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function createArticle({ title, body }) {
  const data = { title, body, date: Timestamp.now() };
  const docRef = await addDoc(collection(db, "articles"), data);
  return { id: docRef.id, ...data };
}

export async function editArticle(editedArticle) {
  const result = doc(db, `articles/${editedArticle.id}`);
  await updateDoc(result, { body: editedArticle.body });
}

export async function deleteArticle(id) {
  const result = doc(db, `articles/${id}`);
  await deleteDoc(result);
}

// NOT FINISHED: This only gets the first 20 articles. In a real app,
// you implement pagination.
export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db, "articles"), orderBy("date", "desc"), limit(20))
  );
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}
