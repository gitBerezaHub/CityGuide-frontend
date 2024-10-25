<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TryButton from '@/components/TryButton.vue'

const isImageChosen = ref(false)
let photo = null
const getImage = () => {
  photo = document.getElementById('img').files[0]
  if (photo) {
    isImageChosen.value = true
    const img = document.getElementById('preview')
    img.src = URL.createObjectURL(photo)
  }
}

onMounted(() => {
  isImageChosen.value = false
})
</script>

<template>
  <div class="file-input-wrapper">
    <label for="img" class="button">
      <i class="fa fa-cloud-upload">Выберите фото</i>
    </label>
    <input @change="getImage" class="input" id="img" type="file"/>
    <div :class="isImageChosen ? 'preview__wrapper' : ''">
      <img class="preview" id="preview" src="#" alt="">
    </div>
    <TryButton @click="$emit('api-photo-request', photo)" v-if="isImageChosen" class="findBtn">Найти!</TryButton>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 900px) {
  .preview {
    width: 30svw !important;
  }
}
.file-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .preview {
    width: 80svw;
    border-radius: 6px;
  }

  .preview__wrapper {
    background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
    padding: 10px;
    border-radius: 16px;
  }

  .findBtn {
    margin-top: 40px;
  }

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

  .button {
    margin-bottom: 40px;
    align-items: center;
    appearance: none;
    background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
    border: 0;
    border-radius: 12px;
    box-shadow: rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 62px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 24px;
  }

  .button:hover {
    box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  .button:active {
    transform: translateY(1px);
  }
}
</style>
