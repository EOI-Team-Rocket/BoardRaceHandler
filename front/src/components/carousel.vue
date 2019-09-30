<template>
  <div class="carouselContainer">
    <b-carousel
      id="carousel-1"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;" 
    > <!-- try to put in style -->
      <b-carousel-slide
        v-for="data in datas"
        :key="data._id"
        :caption="data.title?data.title:data.name"
        :img-src="data.image"
      >
        <p>
          {{data.date?'Fecha: '+data.date:''}}
          <br />
          {{data.hour?'Hora: '+data.hour:''}}
        </p>
        <p>{{data.place?'Lugar: '+data.place:''}}</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Carousel",
  props: {
    resource: String
  },
  data() {
    return {
      datas: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/v1/" + this.resource)
      .then(datas => {
        this.datas = datas.data.data.slice(0, 5);
        
        
        
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style scoped>
.carouselContainer {
  height: 100%;
  width: 100%;
}
</style>