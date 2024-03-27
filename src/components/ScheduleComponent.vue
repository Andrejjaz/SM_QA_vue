<script setup>
import SingleShiftComponent from '@/components/SingleShiftComponent.vue';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia';
const store = useDataStore();

const { currentEmployee, currentAnswers } = storeToRefs(store);
</script>

<template>
  <div class="schedule">
    <template v-if="currentEmployee?.value">
        <SingleShiftComponent v-for="(oneShiftAnswers, index) in currentAnswers" :key="index" :shiftDate="oneShiftAnswers.date" :shiftAnswers="oneShiftAnswers.answers" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  flex-basis: 85%;
  padding: 15px 0;
  flex-shrink: 1;
  flex-grow: 0;
}
</style>
