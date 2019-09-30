<template>
  <div class="carouselContainer">
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;" 
    > 
      <b-carousel-slide
        v-for="data in datas"
        :key="data._id"
        :img-src="data.image"
      >
        <div class="backTransparency">
          <p class="titleSize">{{data.title?data.title:data.name}}</p>
          <p>{{data.date?'Fecha: '+data.date:''}}</p>          
          <p>{{data.hour?'Hora: '+data.hour:''}}</p>
          <p>{{data.place?'Lugar: '+data.place:''}}</p>
        </div>
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
        this.datas = datas.data.data;
        /* Ordenamos los datos para que se muestren de menor a mayor fecha */
        this.datas.sort(function(a,b){
          return new Date(a.date) - new Date(b.date); 
        });
        this.datas = this.datas.slice(0,5);
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style scoped>
.carouselContainer {
  height: 250px;
  width: 500px;
}

#carouselContainer .carousel-caption{
  background-color: rgba(111, 129, 143, 0.65);
}

.backTransparency{
  background-color: rgba(111, 129, 143, 0.65);
}

.titleSize{
  font-size: 30px;
}
</style>