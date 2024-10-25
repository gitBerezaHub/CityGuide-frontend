<script lang="ts" setup>
import { ref } from 'vue'
import FileInput from '@/components/FileInput.vue'
import CityChoice from '@/components/CityChoice.vue'
import { sendPhoto, sendText } from '@/api/api'

const placeholderExamples = ['Исторические здания', 'Экопарки', 'Тематические бары', 'Торговые центры']
const generatePlaceholder: string = () => {
  const randomIndex: number = Math.round(Math.random() * 3)
  return placeholderExamples[randomIndex]
}

type InputType = 'text' | 'file'
const inputType: InputType = ref('text')

const city = ref('')
const getCity = (value) => {
  city.value = value
}

const photo = ref(null)
const getPhoto = (value) => {
  photo.value = value
}

const requestText = ref('')
const apiTextRequest = () => {
  if (city.value && requestText.value) {
    sendText(requestText.value, city.value)
  }
}

const apiPhotoRequest = (value) => {
  getPhoto(value)
  if (city.value && photo.value) {
    sendPhoto(photo.value, city.value)
  }
}

</script>

<template>
  <div class="request-page-wrapper">
    <h1 class="header__text">Что будем искать?</h1>
    <div class="content__wrapper">
      <div class="content__settings">
        <div class="slogan__wrapper">
          <h1 class="slogan__text">Выберите город и режим</h1>
        </div>
        <CityChoice @choose-city="getCity"/>
        <div class="input-types">
          <div class="input-types__text-wrapper">
            <p :class="inputType==='text' ? 'input-types__text-active' : ''" class="input-types__text"
               @click="inputType = 'text'">Текст</p>
          </div>
          <div class="input-types__file-wrapper">
            <p :class="inputType==='file' ? 'input-types__file-active' : ''" class="input-types__file"
               @click="inputType = 'file'">Фото</p>
          </div>
        </div>
      </div>

      <div class="content__input">
        <div v-if="inputType==='text'" class="search__wrapper-text">
          <input v-model="requestText" :placeholder='`${generatePlaceholder()}...`' class="search__input-text"
                 type="text">
          <img alt="" class="add-image" src="@/assets/find.svg" width="30" @click="apiTextRequest">
        </div>
        <div v-else class="search__wrapper-file">
          <FileInput @api-photo-request="apiPhotoRequest"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@media screen and (min-width: 900px) {
  .content__wrapper {
    display: flex;
    flex-direction: row;
  }

  .content__settings, .content__input {
    width: 40svw;

    .search__wrapper-text {
      margin-top: 60px !important;
      width: calc((75svw + 40px) / 2.5) !important;
    }

    .slogan__wrapper {
      margin-bottom: 20px;
    }
  }

  .input-types {
    width: 35svw !important;
    margin-top: 50px !important;

    .input-types__text-wrapper,
    .input-types__file-wrapper {
      background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
      padding: 4px;
      border-radius: 12px;

      .input-types__text,
      .input-types__file {
        background-color: #fff;
        padding: 10px;
        border-radius: 8px;
      }
    }

    .input-types__text-active,
    .input-types__file-active {
      background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
      color: #fff;
      border-bottom: none !important;
    }
  }
}

.request-page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content__wrapper {
    .content__settings,
    .content__input {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .header__text {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 40px;
  }

  .slogan__wrapper {
    margin-top: 60px;

    .slogan__text {
      font-size: 24px;
    }
  }

  .search__wrapper-text {
    width: calc(75svw + 40px);
    display: flex;
    align-items: center;
    margin-top: 30px;
    background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
    padding: 10px;
    border-radius: 18px;

    .search__input-text {
      width: 75svw;
      background-color: #fff;
      border: none;
      border-radius: 8px;
      aspect-ratio: 8 / 1;
      font-size: 18px;

      &:focus {
        outline: none;
      }
    }

    .add-image {
      margin-left: 6px;
      cursor: pointer;
    }
  }

  .search__wrapper-file {
    margin-top: 30px;
  }

  .gradient-button {
    top: 5%;
  }

  .input-types {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 70vw;
    font-size: 20px;

    .input-types__text-active {
      border-bottom: 3px solid #5adaff;
    }

    .input-types__file-active {
      border-bottom: 3px solid #5adaff;
    }
  }
}
</style>
