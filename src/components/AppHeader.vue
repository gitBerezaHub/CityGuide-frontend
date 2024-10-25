<script lang="ts" setup>

</script>

<template>
  <div class="header">
    <img alt="" src="@/assets/city.svg" width="50">
    <h1 class="header__name gradient-text"><b>City Guide</b></h1>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .header__name {
    height: fit-content;
    margin-left: 10px;
    font-size: 24px;
  }
}
</style>
