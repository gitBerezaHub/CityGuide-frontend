<script lang="ts" setup>
import { ref } from 'vue'

const city = ref('')

</script>

<template>
  <div class="city-choice">
    <select id="city" v-model="city" class="city-choice-select" name="city" @change="$emit('choose-city', city)">
      <option value="irkutsk">Иркутск</option>
      <option value="nino">Нижний Новгород</option>
      <option value="yar">Ярославль</option>
      <option value="vlad">Владимир</option>
      <option value="ekb">Екатеринбург</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 900px) {
  .city-choice-select {
    width: 25svw !important;
    border-width: 4px !important;
  }
}

.city-choice-select {
  background-color: #fff;
  border: 2px solid #5468ff;
  border-radius: 8px;
  font-size: 16px;
  height: 46px;
  width: 50vw;
}
</style>
