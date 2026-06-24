<script setup>
import { GoogleMap, HeatmapLayer  } from 'vue3-google-map'
const sanFrancisco = { lat: 	14.5995, lng: 	120.9842}



</script>

<template>

  <GoogleMap
  api-key="AIzaSyARNXm0oUGMMgm-nkHMnXsd6ixZmEnc8o0"
   map-id="65c6ff9dd5a5e4a8"
  style="width: 100%; height: 470px"
      :libraries="['visualization']"
  :center="sanFrancisco"
  :zoom="7"
  >
  <HeatmapLayer :options="{ data: MapData }" />
  </GoogleMap>
</template>


<script>
import api from '@/plugins/axios.js'
import {
  mapMutations
} from 'vuex'

export default {
    data: () => ({
        drawer: false,
    }),
  props: {
      show:{
          type: Boolean,
          default: false
      },
      locations: {
          type: Array,
          default:()=>[]
      }
  },
  watch: {
    // show(val) {
    //   this.drawer = val
    //   console.log("value: " + val)
    //   if(val){
    //     this.fetchAccount()
    //   }
    // },
    // drawer(val) {
    //     console.log("value: " + val)
    //     if(!val) {
    //         this.emitToParent('close')
    //     }
    // }
  },
  created() {
 
  },
  computed: {
        MapData() {
            var locs  = []
            for(var i = 0; i < this.locations.length; i++){
                locs.push({location: {lat: this.IsNum(this.locations[i].lat), lng: this.IsNum(this.locations[i].long)}, weight: 1.5})
            }
            return locs
        }
  },
  methods: {
  }
}
</script>
