<template>
  <div id="eventList">
    <header id="eventsHeader" class="columns headerItem">
      <h2>Nombre</h2>
      <h2>Fecha</h2>
      <h2>Lugar</h2>
    </header>
    <div id="itemList">
      <div v-for="event in events" :key="event._id" class="headerItem">
        <eventItem :event="event" />
        <div id="buttonGroup">
          <button>Eliminar</button>
          <button @click="showModal">Editar</button>
          <ModalDelete :show="show" :id="id" @hideModal="hideModal" @refrestList="refrestList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import eventItem from "@/components/eventItem.vue";
import ModalDelete from "../components/ModalDelete.vue";
export default {
  name: "eventList",
  components: {
    eventItem,
    ModalDelete
  },
  data() {
    return {
      events: [],
      show: false,
      id: "",
      refrest: ""
    };
  },
  methods: {
    getEvents() {
      axios
        .get("http://localhost:3000/api/v1/events")
        .then(events => {
          this.events = events.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showModal() {
      this.show = true;
    },
    hideModal() {
      this.show = false;
    }
  },
  created() {
    this.getEvents();
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
}
</style>