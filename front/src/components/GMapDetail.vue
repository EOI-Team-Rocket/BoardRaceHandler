<template>
  <div class>
    <gmap-map :center="center" :zoom="15" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GMapDetail",
  props: {
    lng: Number,
    lat: Number
  },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  mounted() {
    this.center = {
      lat: Number(this.lat),
      lng: Number(this.lng)
    };
    const marker = {
      lat: Number(this.lat),
      lng: Number(this.lng)
    };
    this.markers.push({ position: marker });
    this.places.push(this.currentPlace);
  }
};
</script>

<style>
.pac-container {
  z-index: 1051;
  margin-left: 100px;
}
.add {
  position: absolute;
}
</style>