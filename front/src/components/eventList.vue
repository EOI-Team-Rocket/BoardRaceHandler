<template>
  <div id="eventList">
      <div class="buttonCreate">
        <button @click="toggleModalForm">Crear Evento</button>
      </div>
      <header id="eventsHeader" class="columns color--white">
        <h2>Nombre</h2>
        <h2>Fecha</h2>
        <h2>Lugar</h2>
        <h2>Borrar</h2>
        <h2>Modificar</h2>
      </header>
    <div id="itemList">
      <div v-for="event in showEvents" :key="event._id" id="listItem">
        <eventItem :event="event" @refreshList="getEvents" />
      </div>
    </div>
    <ModalForm
      :show="true"
      :edit="false"
      v-if="showModalForm"
      @refreshList="getEvents"
      @hideFormModal="toggleModalForm"
    />
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
import ModalForm from "@/components/ModalForm.vue";
export default {
  name: "eventList",
  components: {
    eventItem,
    ModalForm
  },
  data() {
    return {
      events: [],
      showModalForm: false,
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
    toggleModalForm() {
      this.showModalForm = !this.showModalForm;
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

#eventsContainers{
  display:flex;
  justify-content: space-between;
}

.buttonCreate{
  text-align: right;
  padding-top: 10px;
}

.buttonCreate button{
  background: #84abe8;
  background-image: -webkit-linear-gradient(top, #84abe8, #577eff);
  background-image: -moz-linear-gradient(top, #84abe8, #577eff);
  background-image: -ms-linear-gradient(top, #84abe8, #577eff);
  background-image: -o-linear-gradient(top, #84abe8, #577eff);
  background-image: linear-gradient(to bottom, #84abe8, #577eff);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
  font-weight: bolder;
  color: #ffeede;
}

.buttonCreate button:hover {
  background: #9ed2ff;
  background-image: -webkit-linear-gradient(top, #577eff, #84abe8);
  background-image: -moz-linear-gradient(top, #577eff, #84abe8);
  background-image: -ms-linear-gradient(top, #577eff, #84abe8);
  background-image: -o-linear-gradient(top, #577eff, #84abe8);
  background-image: linear-gradient(to bottom, #577eff, #84abe8);
  text-decoration: none;
  border: none;
}

.color--white{
  color: #ffeede;
}

#eventsHeader{
  display: flex;
  justify-content: center;
  padding:10px;
  font-size: 15px;
}

.columns {
  display: flex;
  justify-content: center;
}
.columns * {
  flex: 1;
  flex-basis: 50%;
}

#itemList {
  display: flex;
  flex-direction: column;
}
.select {
  background: #ffffff;
  color: #000000;
}


</style>