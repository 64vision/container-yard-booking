<script setup>
import { ref, onMounted, nextTick } from "vue";
import L from "leaflet";

const map = ref(null);

onMounted(() => {
  nextTick(() => {
    map.value = L.map("map").setView([14.5995, 120.9842], 1);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map.value);
  });
});
</script>

<template>
  <div id="map" style="height: 500px; width: 100%"></div>
</template>

<style>
/* Ensure the map container has a fixed height */
#map {
  height: 500px;
  width: 100%;
}
</style>
