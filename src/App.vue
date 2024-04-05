<script setup>
import SvgComponent from '@/components/icons/SvgComponent.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <SvgComponent />

  <div class="navigation">
    <RouterLink to="/" class="link">Home</RouterLink>
    <RouterLink to="admin" class="link">Admin</RouterLink>
  </div>

  <RouterView />
</template>

<style>
html {
  height: 100%;
  min-width: 320px;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

body {
  font: 14px/1.2 'Roboto', sans-serif;
  height: 100%;
  min-width: 320px;
  position: relative;
  margin: 0;

  background-color: #131f20;
  color: white;
}

#app > svg {
  display: none;
}



@media print {
  body {
      visibility: hidden;
  }
  .schedule {
      visibility: visible;
      position: absolute;
      padding: 0 20px;
      left: 0;
      top: 0;
  }
}


.navigation {
  display: flex;
  justify-content: left;
  padding: 20px;

  .link {
    color: #334140;
    margin-right: 10px;
    padding: 5px;
    background-color: #4d5d5d;
    text-decoration: none;
    font-weight: 600;

    &.router-link-active {
      color: white;
      text-decoration: underline;
    }
  }
}
</style>
