<template>
  <div class="home">
    <div class="carouselContainer mt-5">
      <Carousel resource="events" />
    </div>
    <ListCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import Carousel from '@/components/Carousel.vue';
import ListCard from '@/components/ListCard.vue';

export default {
  name: "home",
  components: {
    Carousel,
    ListCard
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
