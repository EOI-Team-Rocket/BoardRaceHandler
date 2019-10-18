<template>
  <div>
    <div>
      <label>
        
        <button class="add" @click="addMarker">Add</button>
        <gmap-autocomplete class="pac-container" @place_changed="setPlace"></gmap-autocomplete>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
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
  name: "GMapForm",
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
    this.geolocate();
  },
  

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        const place = {
          place: this.currentPlace.formatted_address,
          marker: marker
        }
        this.center = marker;
        this.currentPlace = null;
        
        localStorage.setItem("place", JSON.stringify(place));
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style>
.pac-container {
  z-index: 1051;
  margin-left: 100px;
}
.add{
  position: absolute;
  background: #84abe8;
  background-image: -webkit-linear-gradient(top, #84abe8, #577eff);
  background-image: -moz-linear-gradient(top, #84abe8, #577eff);
  background-image: -ms-linear-gradient(top, #84abe8, #577eff);
  background-image: -o-linear-gradient(top, #84abe8, #577eff);
  background-image: linear-gradient(to bottom, #84abe8, #577eff);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  color: #ffeede;
  font-size: 15px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
}

.add:hover{
  background: #9ed2ff;
  background-image: -webkit-linear-gradient(top, #577eff, #84abe8);
  background-image: -moz-linear-gradient(top, #577eff, #84abe8);
  background-image: -ms-linear-gradient(top, #577eff, #84abe8);
  background-image: -o-linear-gradient(top, #577eff, #84abe8);
  background-image: linear-gradient(to bottom, #577eff, #84abe8);
  text-decoration: none;
  border: none;
}

</style>