<script setup>
import { ref } from 'vue';
import AdminSingleTweetComponent from '@/components/AdminSingleTweetComponent.vue';

const props = defineProps({
    shiftDate: {
        type: Object
    },
    shiftAnswers: {
        type: Object
    },
    shiftNumber: {
        type: Number
    }
})

const toggle = ref(true);
</script>

<template>
    <div v-if="props.shiftAnswers?.length" class="one-shift">
      <b>{{ props.shiftDate.shiftDate }}</b>
      <p>{{ props.shiftDate.shiftTime }}</p>

      <button class="shift-toggler" @click="toggle = !toggle" :class="{ active: toggle }">
        <svg class="icon">
          <use xlink:href="#icon-angle-down"></use>
        </svg>
      </button>

      <div class="answers-wrapper" :class="{ active: toggle }">
        <div class="tweet-wrapper">
          <AdminSingleTweetComponent v-for="(tweet, index) in props.shiftAnswers" :shiftNumber="shiftNumber" :tweetNumber="index" :key="index" :tweet="tweet" />
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.one-shift {
  padding: 20px 20px 5px;
  background-color: #334140;
  position: relative;
  margin-bottom: 15px;
}

.tweet-wrapper {
  position: relative;
  margin-bottom: 15px;
}

.shift-toggler {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0;
  background-color: #4e5d5e;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.shift-toggler.active {
  transform: rotate(180deg);
}

.answers-wrapper {
  display: none;
}

.answers-wrapper.active {
  display: block;
}

.shift-toggler svg {
  font-size: 30px;
  width: 30px;
  height: 30px;
  fill: #fff;
}
</style>