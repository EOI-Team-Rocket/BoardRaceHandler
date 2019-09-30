<template>
  <div id="eventList">
    <header id="eventsHeader" class="columns headerItem">
      <h2>Nombre</h2>
      <h2>Fecha</h2>
      <h2>Lugar</h2>
      <h2></h2>
      <h2></h2>
    </header>
    <div id="itemList">
      <div v-for="event in showEvents" :key="event._id" class="headerItem">
        <eventItem :event="event" @refreshList="getEvents" />
      </div>
    </div>
    <div class="d-flex justify-content-center mt-5" v-if="showEvents != null">
      <!--------------------------------------------Flecha de retorno------------------------------------------------>
      <button type="button" v-if="page > 1" @click="previous" class="btn btn-md btn-dark">&laquo;</button>
      <!-------------------------------------------------------------------------------------------------------------->

      <!--------------------------------------------Numeros de la paginacion------------------------------------------>
      <div v-for="index in pages" class="page" :key="index">
        <button
          class="btn btn-md btn-dark"
          @click="changePage(index)"
          v-if="index < 1 || index > numberPages"
          :class="{select: index == page, invisible: index < 1 || index > numberPages}"
        ></button>
        <button
          class="btn btn-md btn-dark"
          @click="changePage(index)"
          v-else
          :class="{select: index == page}"
        >{{index}}</button>
      </div>
      <!-------------------------------------------------------------------------------------------------------------->

      <!--------------------------------------------Flecha de siguiente------------------------------------------------>
      <button
        type="button"
        v-if="page < numberPages"
        @click="next"
        class="btn btn-md btn-dark"
      >&raquo;</button>
      <!-------------------------------------------------------------------------------------------------------------->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import eventItem from "@/components/eventItem.vue";
export default {
  name: "eventList",
  components: {
    eventItem
  },
  data() {
    return {
      events: [],
      page: 1,
      numberPages: 0,
      limit: 10,
      showEvents: [],
      pages: []
    };
  },
  methods: {
    getEvents() {
      axios
        .get("http://localhost:3000/api/v1/events")
        .then(events => {
          this.events = events.data.data.reverse();
          this.numberPages = Math.ceil(this.events.length / this.limit);
          /* Mostramos el numero de cartas que se van a mostrar en la vista */
          this.getShowCard();
        })
        .catch(err => {
          console.log("Error getting events:" + err);
        });
    },
    next() {
      if (this.page <= this.numberPages) {
        this.page++;
      }
    },

    previous() {
      if (this.page >= 1) {
        this.page--;
      }
    },

    getShowCard() {
      this.showEvents = this.events.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },

    arrayPages() {
      for (let i = -2; i <= 2; i++) {
        this.pages.push(this.page + i);
      }
    },

    changePage(index) {
      this.page = index;
    }
  },
  created() {
    this.getEvents();
    this.pages = [];
    this.arrayPages();
  },
  watch: {
    page() {
      this.pages = [];
      this.arrayPages();
      this.getShowCard();
    }
  }
};
</script>

<style scoped>
.headerItem {
  color: white;
}
.columns {
  display: flex;
  justify-content: center;
}
.columns * {
  flex: 1;
  flex-basis: 50%;
}
.select {
  background: #ffffff;
  color: #000000;
}
</style>