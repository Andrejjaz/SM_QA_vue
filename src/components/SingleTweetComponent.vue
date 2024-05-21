<script setup>
import { computed } from 'vue';

const props = defineProps({
    tweet: {
        type: Object
    }
})

const familyNamecheap = computed(() => {
    return props.tweet['Connected Profile']?.toLowerCase() === 'namecheap'
})

const familySpaceship = computed(() => {
    return props.tweet['Connected Profile']?.toLowerCase() === 'spaceship'
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
            <span v-if="familyNamecheap" class="family" title="Namecheap">N</span>
            <span v-if="familySpaceship" class="family" title="Spaceship">S</span>
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
            <select>
                <option selected>Checked</option>
                <option>Recommendation</option>
                <option>Mistake</option>
                <option>Critical mistake</option>
                <option>Cool post</option>
            </select>

            <select>
                <option selected>Communication standart format</option>
                <option>checked</option>
                <option>recommendation</option>
                <option>mistake</option>
                <option>critical mistake</option>
            </select>
        </div>
        <div class="tweet-textarea-block">
            <textarea @blur="fixHeight"></textarea>
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