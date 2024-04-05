<script setup>
import { useDataStore } from '@/stores/data'
const store = useDataStore();

import { computed, defineProps } from 'vue';
const props = defineProps({
    employee: {
        type: Object
    }
});

console.log(props.employee);

const name = computed(() => {
    return props.employee.Name.split(' ')[0]
});

const surname = computed(() => {
    return props.employee.Name.split(' ')[1]
});
</script>

<template>
    <li>
        <button class="employees-button" @click="store.setCurrentEmployee(props.employee)">
            <span>{{ name }}</span>
            <span>{{ surname }}</span>
        </button>
    </li>
</template>

<style lang="scss" scoped>
.employees-button {
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
</style>