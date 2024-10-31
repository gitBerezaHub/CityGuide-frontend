<script setup lang="ts">
import defineProps from 'vue'

const props = defineProps(['markers'])
console.log(props.markers)
</script>

<template>
  <div class="content__markers__wrapper">
    <ul class="content__markers__list">
      <li v-for="marker in props.markers"
          :key="marker.xid" class="content__markers__list-item">
        <h1 class="content__markers__title">{{ marker.title }}</h1>
        <p class="content__markers__description">{{ marker.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 900px) {
  .content__markers__wrapper {
    width: 25vw;
    margin-top: 0 !important;
    margin-right: 10px;
    max-height: unset !important;

    .content__markers__list-item {
      margin-bottom: 25px !important;
    }
  }
}

.content__markers__wrapper {
  background-color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  overflow: auto;
  max-height: 30vh;

  .content__markers__list {
    padding: 10px;
    margin-left: 20px;

    .content__markers__list-item {
      margin-bottom: 15px;

      .content__markers__title {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 5px;
      }

      .content__markers__description {
        color: #717171;
      }
    }
  }
}
</style>
