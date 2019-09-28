<template>
  <div class="home">
    <HelloWorld />
    <div class="carouselContainer">
      <Carousel resource="events" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Carousel from "@/components/Carousel";

export default {
  name: "home",
  components: {
    HelloWorld,
    Carousel
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
  width: 90%;
  height: 90%;
}
.helloWorldContainer {
}
</style>
