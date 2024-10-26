<template>
  <div class="wrapper">
    <h1 class="header__text">Вот, что нам удалось найти</h1>
    <div class="yandex-map__wrapper">
      <yandex-map :settings="{
        location: {
          center: [apiStore.places[0].longitude, apiStore.places[0].latitude],
          zoom: 9,
        },
      }" height="500px">
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer/>
        <yandex-map-marker
          v-for="(marker, index) in markers"
          :key="index"
          :settings="marker"
        >
          <div class="marker"/>
        </yandex-map-marker>
      </yandex-map>
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
      coordinates: [apiStore.places[i].longitude, apiStore.places[i].latitude],
      title: apiStore.places[i].name,
      onClick: handleClick
    })
  }
}

onMounted(() => {
  fillMarkers()
})

</script>

<style lang="scss" scoped>
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
  }

  .yandex-map__wrapper {
    width: 50vw;
    height: 50vh;
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
