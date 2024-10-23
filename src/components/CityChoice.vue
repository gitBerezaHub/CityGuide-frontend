<script setup lang="ts">

</script>

<template>
  <div class="city-choice">
    <label for="city" class="city-choice-label">
      <h3>Ваш город:</h3>
    </label>
    <select class="city-choice-select" name="city" id="city">
      <option value="nino">Нижний Новгород</option>
      <option value="yar">Ярославль</option>
      <option value="vlad">Владимир</option>
      <option value="ekb">Екатеринбург</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.city-choice {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  font-size: 20px;

  .city-choice-label {
    margin-right: 10px;
  }

  .city-choice-select {
    background-color: #fff;
    border: 2px solid #5468ff;
    border-radius: 8px;
    font-size: 14px;
    height: 30px;
  }
}
</style>
