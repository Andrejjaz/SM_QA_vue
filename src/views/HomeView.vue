<script setup>
import SharedVButton from '@/components/shared/ButtonComponent.vue'
import FieldsetComponent from '@/components/shared/FieldsetComponent.vue'
import LabelComponent from '@/components/shared/LabelComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import { useDataStore } from '@/stores/data'

import { onMounted, ref } from 'vue'

const store = useDataStore()

const loading = ref(false)

const currentDate = new Date()

const month = ref(currentDate.getMonth() + 1)
const year = ref(currentDate.getFullYear())

const setFileUploaded = (e) => {
  store.ExcelToJSON(e, e.target.dataset.name)
  e.target.classList.add('uploaded')
}

const onSubmit = () => {
  if (!store.data?.scheduleObj?.length) {
    alert('Please put file with schedule')
    return
  }

  if (!store.data?.answersObj?.length) {
    alert('Please put file with twitter answers')
    return
  }

  loading.value = true

  const dataToUpload = {
    date: `${month.value} ${year.value}`,
    scheduleObj: store.data.scheduleObj,
    answersObj: store.data.answersObj
  }

  let docId = ''

  if (store.dataBase.length) {
    const filteredFromDB = store.dataBase.filter((item) => {
      return item.date === dataToUpload.date
    })

    if (filteredFromDB.length) {
      docId = filteredFromDB[0].id
    }
  }

  if (!docId) {
    store.addData(dataToUpload)
  } else {
    store.updateData(docId, dataToUpload)
  }

  loading.value = false

  store.setDate(dataToUpload.date)

  router.push('table')
}

onMounted(() => {
  store.fetchDB();
});
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="container">
        <div class="main-inner">
          <article>
            <div class="form-wrapper">
              <h1>Please make sure that both files are uploaded to have proper results</h1>

              <form enctype="multipart/form-data" @submit.prevent="onSubmit">
                <FieldsetComponent class="date-input">
                  <label for="month-input">Type month</label>
                  <input id="month-input" type="number" v-model="month" min="1" max="12" />
                </FieldsetComponent>
                <FieldsetComponent class="date-input">
                  <label for="year-input">Type year</label>
                  <input id="year-input" type="number" v-model="year" />
                </FieldsetComponent>
                <FieldsetComponent>
                  <LabelComponent class="input-label">
                    <input
                      @change.prevent="setFileUploaded"
                      id="upload-schedule"
                      class="input-file"
                      accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      type="file"
                      name="files[]"
                      data-name="schedule"
                    />

                    <svg class="icon">
                      <use xlink:href="#icon-upload"></use>
                    </svg>

                    <span>
                      Please use this input file field for uploading
                      <br />
                      <b>schedule .xlsx file</b>
                    </span>
                  </LabelComponent>
                </FieldsetComponent>
                <FieldsetComponent>
                  <LabelComponent class="input-label">
                    <input
                      @change.prevent="setFileUploaded"
                      id="upload-answers"
                      class="input-file"
                      accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      type="file"
                      name="files[]"
                      data-name="answers"
                    />

                    <svg class="icon">
                      <use xlink:href="#icon-upload"></use>
                    </svg>

                    <span>
                      Please use this input file field for uploading
                      <br />
                      <b>answers .xlsx file</b>
                    </span>
                  </LabelComponent>
                </FieldsetComponent>

                <div class="btn-block">
                  <SharedVButton btnType="submit" class="btn"> Submit </SharedVButton>
                </div>
              </form>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 15px;
}

.container {
  max-width: 950px;
  margin: 0 auto;
}

.form-wrapper {
  background-color: #334140;
  padding: 15px;
}

.content-wrapper {
  display: flex;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-column-gap: 0;
  }
}

.uploaded + .icon {
  color: #334140;
}

.btn-block {
  display: flex;
  width: 100%;
  justify-content: center;
  grid-column: 1/3;
}

h1 {
  margin: 0 0 15px;
  font-weight: 400;
  text-align: center;
}

fieldset {
  border: none;
  margin: 0 auto 15px;
  width: 100%;
  padding: 0;

  @media screen and (max-width: 768px) {
    grid-column-start: 1;
  }
}

fieldset label {
  cursor: pointer;
  border: 1px solid #4d5d5d;
  background-color: #4d5d5d;
  padding: 5px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  font-size: 16px;
}

fieldset span {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

fieldset input[type='file'] {
  display: none;
}

fieldset .icon {
  height: 60px;
  width: 60px;
  fill: none;
}

textarea {
  width: 100%;
}

.date-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    background: none;
    border: none;
    margin-bottom: 5px;
  }

  input {
    width: calc(100% - 13px);
    padding: 0 5px;
    height: 30px;
  }
}
</style>
