<script setup>
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
</script>

<template>
    <div class="single-tweet">
        <div class="admin-tweet">
            <p>Message: {{ tweet.message }}</p>
            <p><a :href='tweet.permalink'>Reply</a></p>
            <div v-if="tweet?.adminComment" class="admin-comment">
                <p v-if="tweet.adminComment.adminMistake">Admin mistake: {{ tweet.adminComment.adminMistake }}</p>
                <p v-if="tweet.adminComment.adminFormat">Admin format: {{ tweet.adminComment.adminFormat }}</p>
                <p v-if="tweet.adminComment.adminComment">
                    <span>Admin comment: </span>
                    <pre>{{ tweet.adminComment.adminComment }}</pre>
                </p>
            </div>
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

.admin-tweet {
    background-color: #ccc;
    padding: 20px 20px 5px;
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