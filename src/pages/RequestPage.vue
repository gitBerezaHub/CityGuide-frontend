<script lang="ts" setup>
import { ref } from 'vue'
import FileInput from '@/components/FileInput.vue'
import CityChoice from '@/components/CityChoice.vue'
import { sendPhoto, sendText } from '@/api/api'
import { useApiStore } from '@/store/useApiStore'
import { storeToRefs } from 'pinia'

const linkToHtml = 'http://localhost:63342/frontend/src/pages/MapPage/index.html'

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

const apiStore = useApiStore()
const { places } = storeToRefs(apiStore)

// watch(places, () => {
//   if (places) {
//     // router.push('/map') <-- here
//     location.href('@/pages/MapPage/index.html')
//   }
// })
</script>

<template>
  <div class="request-page-wrapper">
    <div class="logo">
      <img alt="" src="@/assets/city.svg" width="50">
      <h1 class="logo__name gradient-text"><b>City Guide</b></h1>
    </div>
    <h1 class="header__text">Что будем искать?</h1>
    <div class="content__wrapper">
      <div class="slogan__wrapper">
        <h1 class="slogan__text">Выберите город и введите запрос</h1>
      </div>
      <div class="content__data">
        <CityChoice @choose-city="getCity" class="content__data__city-choice"/>

        <div class="search__wrapper-file">
          <FileInput @api-photo-request="apiPhotoRequest"/>
        </div>

        <div class="search__wrapper-text">
          <textarea v-model="requestText" :placeholder='`${generatePlaceholder()}...`'
                    oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                    class="search__input-text"></textarea>

          <a :href="linkToHtml"><img alt="" class="find-btn-icon" src="@/assets/find.svg" width="30"></a>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.request-page-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    position: absolute;
    top: 30px;
    left: 7.5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo__name {
      height: fit-content;
      margin-left: 10px;
      font-size: 24px;
    }
  }

  .header__text {
    font-size: 40px;
    margin-top: 30px;
  }

  .content__wrapper {
    .slogan__wrapper {
      margin-top: 70px;
      width: 85vw;
      text-align: start;
      font-size: 28px;
    }

    .content__data {
      .content__data__city-choice, .search__wrapper-text, .file-input-wrapper {
        width: 25vw;
      }

      margin-top: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .content__data__city-choice {
      }

      .search__wrapper-text {
        display: flex;
        flex-direction: row;
        background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
        min-height: 34px;
        height: fit-content;
        //align-items: center;
        justify-content: space-around;
        border-radius: 8px;
        padding: 4px 2px;

        background-color: #fff;
        font-size: 16px;

        .search__input-text {
          width: calc(25vw - 30px - 20px - 4px);
          min-height: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          word-wrap: break-word;
          resize: vertical;
          font-size: 16px;
          padding: 4px;

          &:focus {
            outline: none;
          }
        }

        .find-btn-icon {
          padding-top: 4px;
        }
      }

      .search__wrapper-file {
      }
    }
  }
}
</style>
