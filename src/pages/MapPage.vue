<template>
  <div class="wrapper">
    <h1 class="header__text">Вот, что нам удалось найти</h1>
    <div class="content">
      <div class="content__markers__wrapper">
        <ul class="content__markers__list">
          <li v-for="marker in markers"
              :key="marker.xid" class="content__markers__list-item">
            <h1 class="content__markers__title">{{ marker.title }}</h1>
            <p class="content__markers__description">{{ marker.description }}</p>
          </li>
        </ul>
      </div>
      <div class="yandex-map__wrapper">
        <yandex-map :settings="{
        location: {
          center: [apiStore.places[0].longitude, apiStore.places[0].latitude],
          zoom: 9,
        },
      }">
          <yandex-map-default-scheme-layer/>
          <yandex-map-default-features-layer/>
          <yandex-map-marker
            v-for="marker in markers"
            :key="marker.xid"
            :settings="marker"
          >
            <div class="marker"/>
          </yandex-map-marker>
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import type { YMap } from '@yandex/ymaps3-types'
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'
import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker'
import { useApiStore } from '@/store/useApiStore'

const map = shallowRef<null | YMap>(null)

const apiStore = useApiStore()
console.log(apiStore.places[0].latitude)

const markers: YMapMarkerProps[] = ref([])
const handleClick = (event: MouseEvent) => console.log(event)

function fillMarkers () {
  for (let i = 0; i < apiStore.places.length; i++) {
    markers.value.push({
      xid: apiStore.places[i].xid,
      title: apiStore.places[i].name,
      description: apiStore.places[i].description,
      categories: apiStore.places[i].categories,
      city: apiStore.places[i].city,
      wikiId: apiStore.places[i].wikiId,
      coordinates: [apiStore.places[i].longitude, apiStore.places[i].latitude],
      onClick: handleClick
    })
  }
}

onMounted(() => {
  fillMarkers()
})

</script>

<style lang="scss" scoped>
@media screen and (min-width: 900px) {
  .content {
    flex-direction: row !important;
    height: 75svh;

    .content__markers__wrapper {
      width: 25vw;
      margin-bottom: 0 !important;
      margin-right: 10px;
      border-radius: 8px 0 0 8px !important;
      max-height: unset !important;

      .content__markers__list-item {
        margin-bottom: 25px !important;
      }
    }

    .yandex-map__wrapper {
      width: 100%;
      height: 100% !important;
    }
  }
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header__text {
    font-size: 32px;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
  }

  .content {
    width: 90svw;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 18px;
    background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);

    .content__markers__wrapper {
      background-color: #fff;
      border-radius: 8px 8px 0 0;
      margin-bottom: 10px;
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

    .yandex-map__wrapper {
      width: 100%;
      height: 50svh;
    }
  }
}

.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
}
</style>
