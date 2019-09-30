<template>
  <div id="eventList">
    <header id="eventsHeader" class="columns color--white"> 
      <h2 class="listTitles">Nombre</h2>
      <h2 class="listTitles">Fecha</h2>
      <h2 class="listTitles">Lugar</h2>
      <h2></h2> <!-- cris will fix it-->
      <h2></h2>
    </header>
    <div id="itemList ">
      <div v-for="event in events" :key="event._id" id="listItem color--white">
        <eventItem :event="event" @refreshList="getEvents" />
      </div>
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
      events: []
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
    }
  },
  created() {
    this.getEvents();
  }
};
</script>

<style scoped>

.color--white{
  color: #ffeede;
}

.listTitles {
  
  font-size: 18px;
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
}
</style>