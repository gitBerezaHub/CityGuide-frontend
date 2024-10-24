<script setup lang="ts">

</script>

<template>
  <div class="city-choice">
    <select class="city-choice-select" name="city" id="city">
      <option value="nino">Нижний Новгород</option>
      <option value="yar">Ярославль</option>
      <option value="vlad">Владимир</option>
      <option value="ekb">Екатеринбург</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.city-choice-select {
  margin-top: 30px;
  background-color: #fff;
  border: 2px solid #5468ff;
  border-radius: 8px;
  font-size: 16px;
  height: 40px;
  width: 50vw;
}
</style>
