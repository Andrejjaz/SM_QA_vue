<script setup>
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia';
const store = useDataStore();

import { computed, ref, watch } from 'vue';

const props = defineProps({
    tweet: {
        type: Object
    },
    shiftNumber: {
        type: Number
    },
    tweetNumber: {
        type: Number
    }
})

const adminComment = ref('');
const adminMistake = ref('Checked');
const adminFormat = ref('0');

watch(adminComment, () => {
    if (adminComment.value.length > 0) {
        store.addAdminComment(props.shiftNumber, props.tweetNumber, {adminComment, adminMistake, adminFormat});
    }
})

const family = computed(() => {
    return props.tweet['Connected Profile']?.toLowerCase() === 'namecheap'
})

const link = computed(() => {
    return props.tweet['Native Permalink']
})


let completedTimeStamp;

if (props.tweet['Task Status'] === 'Tasked') {
    completedTimeStamp = props.tweet['First Reply Timestamp'];
} else {
    completedTimeStamp = props.tweet['Completed Timestamp'];
}

const submittedTimestampName = computed(() => {
    return props.tweet['Timestamp (EET)'] ||
            props.tweet['Timestamp (CAT)'] ||
            props.tweet['Timestamp (EAT)'] ||
            props.tweet['Timestamp (PT)'];
})

const submittedTime = new Date(submittedTimestampName.value);
const completedTime = new Date(completedTimeStamp);

const submittedTimeFormatted = computed(() => {
    return submittedTime.toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
})

const completedTimeFormatted = computed(() => {
    return completedTime.toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
})

const timeWasted = computed(() => {
    const diff = Math.abs(completedTime - submittedTime);
    const minutes = Math.floor(diff / 1000 / 60);

    return minutes
})

const clientComment = computed(() => {
    return props.tweet['Message']
})

const smrComment = computed(() => {
    return props.tweet['Permalink']
})

const fixHeight = (e) => {
    e.target.style.height = e.target.scrollHeight + 'px';
}
</script>

<template>
    <div class="single-tweet">
        <div class="tweet-upper-block">
            <span v-if="family" class="family" title="Namecheap">N</span>
            <span v-if="!family" class="family" title="Spaceship">S</span>
            <p>
                <a :href="link" target="_blank">Link to communication</a>
                |
                <span>{{ timeWasted }} minutes processing</span>
            </p>
            <p>
                <b>User ({{ submittedTimeFormatted }}): </b>
                <span>{{ clientComment }}</span>
            </p>
            <p>
                <b>SMR ({{ completedTimeFormatted }}): </b>
                <a :href="smrComment" target="_blank">
                    Link to reply
                </a>
            </p>
        </div>
        <div class="tweet-selects-block">
            <select v-model="adminMistake">
                <option selected value="Checked">Checked</option>
                <option value="Recommendation">Recommendation</option>
                <option value="Mistake">Mistake</option>
                <option value="Critical mistake">Critical mistake</option>
            </select>

            <select v-model="adminFormat">
                <option selected value="0">Communication standart format</option>
                <option value="format 1">format 1</option>
                <option value="format 2">format 2</option>
                <option value="format 3">format 3</option>
                <option value="format 4">format 4</option>
            </select>
        </div>
        <div class="tweet-textarea-block">
            <textarea @blur="fixHeight" v-model="adminComment"></textarea>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.single-tweet {
  padding: 15px;
  background-color: #131f20;
  color: black;
  margin-bottom: 15px;
  position: relative;
}

.tweet-upper-block {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    text-align: center;

    p {
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.family {
  position: absolute;
  top: 20px;
  right: 20px;
  color: yellowgreen;
  font-size: 20px;
  font-weight: normal;
}

.single-tweet {
    p {
        margin-top: 0;
    }

    a {
         color: #000 !important;
    }
}

.tweet-selects-block {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    select {
        background-color: #fff;
        padding: 10px;
        flex-basis: 50%;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
    }
}

.tweet-textarea-block {
    width: 100%;
    display: flex;

    textarea {
        width: 100%;
        height: 50px;
    }
}

.link {
  cursor: pointer;
  color: #000;
}
</style>