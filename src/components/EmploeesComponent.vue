<script setup>
import SingleEmployeeComponent from '@/components/SingleEmployeeComponent.vue';

const props = defineProps({
    employees: {
        type: Array
    }
})
</script>

<template>
    <div class="employees">
        <ul>
            <SingleEmployeeComponent v-for="(employee, index) in props.employees" :key="index" :employee="employee" />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.employees {
  flex-basis: 15%;
  margin-right: 15px;
  flex-shrink: 0;
}

.employees ul {
  list-style: none;
  padding: 0;
}

.employees button {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
  background: green;
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
</style>