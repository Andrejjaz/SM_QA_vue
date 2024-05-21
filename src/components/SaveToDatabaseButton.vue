<template>
  <button class="save-btn">
    <span :disabled="loading ? true : false" @click="saveToDatabase">Save</span>
  </button>
</template>

<script setup>
import { useDataStore } from '@/stores/data'
// import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const store = useDataStore()

// const { currentAnswers } = storeToRefs(store);
const loading = ref(false)

const saveToDatabase = async () => {
  loading.value = true

  const dataToUpload = {
    date: store.currentDate,
    scheduleObj: store.data.scheduleObj,
    answersObj: store.data.answersObj
  }

  let docId = ''

  if (store.dataBase.length) {
    const filteredFromDB = store.dataBase.filter((item) => {
      return item.date == dataToUpload.date
    })

    if (filteredFromDB.length) {
      docId = filteredFromDB[0].id
    }
  }

  store.updateData(docId, dataToUpload)

  loading.value = false
}
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
