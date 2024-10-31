<template>
  <div class="wrapper">
    <h1 class="header__text">Вот, что нам удалось найти</h1>
    <div class="content">

      <MarkersDescription v-if="!isMobile" :markers="markers"/>

      <div class="yandex-map__wrapper">
        <yandex-map :settings="{
        location: {
          center: [apiStore.places[0].longitude, apiStore.places[0].latitude],
          zoom: 13,
        },
      }">
          <yandex-map-default-scheme-layer/>
          <yandex-map-default-features-layer/>
          <yandex-map-marker
            v-for="marker in markers"
            :key="marker.xid"
            :settings="marker"
          >
            <div class="marker-chosen" @click="chosenMarker = marker.xid" v-if="chosenMarker === marker.xid">
              <p>{{ marker.title }}</p></div>
            <div class="marker" @click="chosenMarker = marker.xid" v-else></div>
          </yandex-map-marker>
        </yandex-map>
      </div>

      <MarkersDescription v-if="isMobile" :markers="markers"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import type { YMap } from '@yandex/ymaps3-types'
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'
import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker'
import { useApiStore } from '@/store/useApiStore'
import MarkersDescription from '@/components/MarkersDescription.vue'

const map = shallowRef<null | YMap>(null)

const isMobile = window.innerWidth < 900

const apiStore = useApiStore()
console.log(apiStore.places[0].latitude)

const markers: YMapMarkerProps[] = ref([])

const chosenMarker = ref('')

function fillMarkers () {
  for (let i = 0; i < apiStore.places.length; i++) {
    markers.value.push({
      xid: apiStore.places[i].xid,
      title: apiStore.places[i].name,
      description: apiStore.places[i].description,
      categories: apiStore.places[i].categories,
      city: apiStore.places[i].city,
      wikiId: apiStore.places[i].wikiId,
      coordinates: [apiStore.places[i].longitude, apiStore.places[i].latitude]
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

    .yandex-map__wrapper {
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

    .yandex-map__wrapper {
      border-radius: 8px;
      overflow: hidden;
      width: 100%;
      height: 50svh;
    }
  }
}

.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
}

.marker-chosen {
  position: relative;
  width: 25px;
  height: 25px;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border-radius: 50% 50% 0 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  line-height: 20px;
}

.marker-chosen p {
  width: fit-content;
  background: #fff;
  position: relative;
  top: 80%;
  left: 80%;
  border-radius: 8px;
  padding: 8px;
  border: 4px solid #4A88D9;
  font-size: 10px;
  line-height: normal;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

</style>
