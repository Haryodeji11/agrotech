// lib/firestore.js
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

// Add a new document
export const addMarketplaceItem = async (data: any) => {
  const docRef = await addDoc(collection(db, 'marketplace'), data);
  return docRef.id;
};

// Fetch all items
export const getMarketplaceItems = async () => {
  const snapshot = await getDocs(collection(db, 'marketplace'));
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
};

// Update an item
export const updateMarketplaceItem = async (id: string, updatedData: any) => {
  const docRef = doc(db, 'marketplace', id);
  await updateDoc(docRef, updatedData);
};

// Delete an item
export const deleteMarketplaceItem = async (id: string) => {
  const docRef = doc(db, 'marketplace', id);
  await deleteDoc(docRef);
};


//fetch user by role

export const fetchUsersByRole = async (role: string) => {
  try {
    const q = query(collection(db, "users"), where("role", "==", role));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Users with role ${role}:`, users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
