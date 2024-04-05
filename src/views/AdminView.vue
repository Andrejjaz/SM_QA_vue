<script setup>
import { useDataStore } from '@/stores/data'
import { useDataBaseStore } from '@/stores/db'
import { storeToRefs } from 'pinia';

const store = useDataStore();
const storeDB = useDataBaseStore();

import { ref, onMounted, reactive, computed } from 'vue'

const { data, employeesDB } = storeToRefs(storeDB);

const users = reactive([]);
const shifts = reactive([]);
const activeUser = ref('');
const activeShift = ref('');

const usersShifts = computed(() => {
  return shifts.filter((shift) => {
    console.log(shift.name, activeUser.value);
    return shift.name === activeUser.value
  })
})

const shiftsAnswers = computed(() => {
  return usersShifts.value.filter((shift) => {
    return shift.date === activeShift.value
  })
})

const name = (name) => {
    return name.split(' ')[0]
};

const surname = (name) => {
    return name.split(' ')[1]
};

const switchUser = (user) => {
  activeShift.value = '';
  activeUser.value = user.name
};

onMounted(() => {
  storeDB.fetchEmployees().then(() => {
    employeesDB.value.forEach(element => {
      users.push(element);
    });
  });

  storeDB.fetchDB().then(() => {
    data.value.forEach((element) => {
      shifts.push({
        id: element.id,
        date: element.date,
        name: element.name,
        answers: element.answers
      });
    });
  });
});

</script>

<template>
  <div class="wrapper">
    <main class="main">
      <div class="container">
        <div class="main-inner">
          <article>
            <div class="admin-panel">
              <ul class="employees">
                <li v-for="(user, index) in users" :key="index">
                  <button class="employees-button" @click="switchUser(user)">
                    <span>{{ name(user.name) }}</span>
                    <span>{{ surname(user.name) }}</span>
                  </button>
                </li>
              </ul>

              <ul class="shifts">
                <li v-for="(shift, index) in usersShifts" :key="index">
                  <button class="shifts-button" @click="activeShift = shift.date">
                    <span>{{ shift.date }}</span>
                  </button>

                  <ul v-if="activeShift === shift.date">
                    <li v-for="(oneTweet, index) in shiftsAnswers[0].answers" :key="index">
                      <div>
                        <p>Message: {{ oneTweet["Message"] }}</p>
                        <p><a :href='oneTweet["Permalink"]'>Reply</a></p>
                        <p v-if="oneTweet?.adminComment" class="admin-comment">
                          <span v-if="oneTweet.adminComment.adminMistake">Admin mistake: {{ oneTweet.adminComment.adminMistake }}</span>
                          <span v-if="oneTweet.adminComment.adminFormat">Admin format: {{ oneTweet.adminComment.adminFormat }}</span>
                          <p v-if="oneTweet.adminComment.adminComment">
                            <span>Admin comment: </span>
                            <pre>{{ oneTweet.adminComment.adminComment }}</pre>
                          </p>
                        </p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
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

.admin-panel {
  display: flex;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    list-style: none;
  }
}

.employees {
  flex-basis: 15%;
  margin-right: 15px;
  flex-shrink: 0;
  padding: 0;

  &-button {
    width: 100%;
    padding: 10px 0;
    margin-bottom: 5px;
    color: white;
    background: #4d5d5d;
    border: none;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

.shifts {
  flex-basis: 85%;
  flex-shrink: 0;
  padding: 0;

  &-button {
    width: 15%;
    padding: 10px 0;
    margin-bottom: 5px;
    color: white;
    background: #4d5d5d;
    border: none;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  li {
    display: flex;
    flex-direction: column;
  }

  ul {
    margin: 10px;

    li {
      margin-bottom: 10px;
      padding: 20px;
      background-color: #fff;
      color: #000;
    }
  }
}

.admin-comment {
  margin-top: 10px;
  padding: 10px;
  background-color: #ccc;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}

</style>