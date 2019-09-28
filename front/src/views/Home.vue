<template>
  <div class="home">
    <div class="carouselContainer mt-5">
      <Carousel resource="events" />
    </div>
    
    <div class="d-flex flex-wrap justify-content-left">
      <div v-for="data_event in data_events" :key="data_event.id">
        <CardAnimation :title="data_event.title" :place="data_event.place" :date="data_event.date"/> 
      </div>
    </div>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import Carousel from "@/components/Carousel";
import CardAnimation from '@/components/CardAnimation.vue';


export default {
  name: "home",
  components: {
    Carousel,
    CardAnimation
  },
  data() {
    return {
        data_events: "",
        url_api: "http://localhost:3000/api/v1/events",
    }
  },
  methods: {
      getDataApi(){
          axios.get(this.url_api)
          .then(response => {
              /*Obtenemos todos los datos de la llamada axios.get */
              this.data_events = response.data.data;
          })
          .catch(error => {
              console.log(error.message);
          })
      }
  },
  created: function() {
      this.getDataApi();
  }
};
</script>
<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* center carosuel */
  .carouselContainer {
    margin-left: 5%;
    width: 80%;
    height: 90%;
  }
</style>
