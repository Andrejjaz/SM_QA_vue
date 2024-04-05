import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

import { db } from '@/firebase'
import { doc, collection, addDoc, getDocs, setDoc } from "firebase/firestore";

export const useDataBaseStore = defineStore('db-store', () => {
  const data = reactive([]);
  const employeesDB = reactive([]);

  const fetchDB = async () => {
    data.length = 0;

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  }

  const fetchEmployees = async () => {
    employeesDB.length = 0;

    const querySnapshot = await getDocs(collection(db, "employees"));;
    querySnapshot.forEach((doc) => {
      employeesDB.push({ id: doc.id, ...doc.data() });
    });
}


  const addUser = async (payload) => {
    await addDoc(collection(db, "users"), payload);
  }

  const updateUser = async (user, payload) => {
    await setDoc(doc(db, "users", user.id), payload);
  }

  return {
    data,
    employeesDB,
    fetchDB,
    addUser,
    updateUser,
    fetchEmployees
  }
})