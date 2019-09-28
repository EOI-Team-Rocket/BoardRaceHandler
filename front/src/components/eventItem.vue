<template>
  <div :class="{listRow: true,deleting: this.deleteModalIsShown}">
    <div>
      <span class="eventProperty">{{event.title}}</span>
    </div>
    <div>
      <span class="eventProperty">{{event.date}}</span>
    </div>
    <div>
      <span class="eventProperty">{{event.place}}</span>
    </div>
    <div>
      <button class="buttons" @click="showModalDelete">
        <md-trash-icon w="40%" h="40%" />
      </button>
    </div>
    <div>
      <button class="buttons">
        <md-create-icon w="40%" h="40%" />
      </button>
    </div>
    <ModalDelete
      :show="deleteModalIsShown"
      :id="event._id"
      @hideModal="showModalDelete('')"
      @refreshList="refreshList"
      v-if="deleteModalIsShown"
    />
  </div>
</template>

<script>
import ModalDelete from "./ModalDelete.vue";

export default {
  name: "eventItem",
  props: {
    event: Object
  },
  components: {
    ModalDelete
  },
  data() {
    return {
      deleteModalIsShown: false
    };
  },
  methods: {
    toggleModalDelete() {
      this.deleteModalIsShown = !this.deleteModalIsShown;
    },
    refreshList() {
      this.$emit("refreshList", this.event._id);
    }
  }
};
</script>

<style scoped>
.buttons {
  height: 100%;
  width: 40%;
}
.listRow {
  display: flex;
}
.listRow * {
  flex-grow: 1;
  flex-basis: 20%;
}
.eventProperty {
  size: 150%;
}
.deleting {
  background: rgba(255, 0, 0, 0.212);
}
</style>
