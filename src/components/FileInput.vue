<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TryButton from '@/components/GradientButton.vue'

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
    <label class="button" for="img">
      <i class="fa fa-cloud-upload">Выберите фото</i>
    </label>
    <input id="img" class="input" type="file" @change="getImage"/>
    <div :class="isImageChosen ? 'preview__wrapper' : ''">
      <img id="preview" alt="" class="preview" src="#">
    </div>
    <TryButton v-if="isImageChosen" class="findBtn" @click="$emit('api-photo-request', photo)">Найти!</TryButton>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/button.css";

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
  }
}
</style>
