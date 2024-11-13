<template>
  <router-view/>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useApiStore } from '@/store/useApiStore'

onMounted(() => {
  const apiStore = useApiStore()
  if (apiStore.places.length === 0) {
    apiStore.places = JSON.parse(localStorage.getItem('places'))
  }
})
</script>

<style lang="scss">
@import "@/assets/styles/reset.css";

#app {
  font-family: 'Inter', sans-serif;
}

.gradient-text {
  background: -webkit-linear-gradient(-45deg, #68c9fa, #3857c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
