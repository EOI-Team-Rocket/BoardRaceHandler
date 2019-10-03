<template>
  <div id="eventsContainer">
    <div class="events">
      <eventList />
    </div>
  </div>
</template>

<script>
import eventList from "@/components/eventList";
export default {
  name: "CRUDevents.vue",
  components: {
    eventList
  },
  data() {
    return {};
  },
  created() {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    
    if (!localStorage.getItem("jwt")) {
      this.$router.replace("/");
    } else {
      if (jwt.role != "ADMIN") {
        this.$router.replace("/");
      }
    }
  },
  methods: {}
};
</script>

<style scoped>
.events {
  height: 100%;
  width: 60%;
}
#eventsContainer {
  display: flex;
  justify-content: center;
}


</style>
