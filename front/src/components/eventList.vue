<template>
  <div id="eventList">
    <header id="eventsHeader" class="columns headerItem">
      <h2>Nombre</h2>
      <h2>Fecha</h2>
      <h2>Lugar</h2>
      <button @click="toggleModalForm">Crear Evento</button>
      <h2></h2>
    </header>
    <div id="itemList">
      <div v-for="event in events" :key="event._id" class="headerItem">
        <eventItem :event="event" @refreshList="getEvents" />
      </div>
    </div>
    <ModalForm
        :show="showModalForm"
        v-if="showModalForm"
        @refreshList="getEvents"
        @hideFormModal="toggleModalForm"
    />
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
      showModalForm: false
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
          console.log("Error getting events:" + err);
        });
    },
    toggleModalForm(){
        this.showModalForm = !this.showModalForm;
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
  flex-basis: 50%;
}
</style>