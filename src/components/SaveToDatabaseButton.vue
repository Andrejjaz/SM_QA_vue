<template>
    <button class="save-btn">
        <span :disabled="loading ? true : false" @click="saveToDatabase">Save</span>
    </button>
</template>

<script setup>
import { useDataStore } from '@/stores/data'
import { useDataBaseStore } from '@/stores/db'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue'

import { db } from '@/firebase'
import { doc, setDoc } from "firebase/firestore";

const store = useDataStore();
const storeDB = useDataBaseStore();

const { currentAnswers } = storeToRefs(store);
const loading = ref(false);

const saveToDatabase = async () => {
    loading.value = true;

    const DBusers = storeDB.data.filter((user) => user.name === store.currentEmployee.name);

    if (DBusers.length) {
        currentAnswers.value.forEach(async (oneAnswer) => {
            let date = oneAnswer.date.shiftDate.split(' ')[0];

            const userDateFiltered = DBusers.filter((user) => user.date === date);

            if (oneAnswer.answers.length) {
                storeDB.updateUser(userDateFiltered[0], {
                    name: store.currentEmployee.name,
                    date,
                    answers: oneAnswer.answers
                });
            }
        })
    } else {
        currentAnswers.value.forEach(async (oneAnswer) => {
            let date = oneAnswer.date.shiftDate.split(' ')[0];

            if (oneAnswer.answers.length) {
                storeDB.addUser({
                    name: store.currentEmployee.name,
                    date,
                    answers: oneAnswer.answers
                });
            }
        })
    }

    loading.value = false;
}

onMounted(() => {
  storeDB.fetchDB();
});
</script>

<style lang="scss" scoped>
button {
    cursor: pointer;
    background-color: #4d5d5d;
    padding: 5px 10px;
    font-size: 16px;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 600;
    color: white;

    &:disabled {
        background-color: #b3c0c0;
        cursor: not-allowed;
    }
}
</style>