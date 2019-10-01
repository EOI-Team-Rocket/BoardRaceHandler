<template>
  <div :class="{listRow: true,deleting: this.deleteModalIsShown}" class="color--white ">
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
      <button class="buttons" @click="toggleModalDelete">
        <md-trash-icon w="100%" h="100%" />
      </button>
    </div>
    <div>
      <button class="buttons">
        <md-create-icon w="100%" h="100%" />
      </button>
    </div>
    <ModalDelete
      :show="deleteModalIsShown"
      :id="event._id"
      @hideModal="toggleModalDelete"
      @refreshList="refreshList"
      v-if="deleteModalIsShown"
    />
  </div>
</template>

<script>
import ModalDelete from "@/components/ModalDelete.vue";

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
      this.$emit("refreshList");
    }
  }
};
</script>

<style scoped>

.color--white{
  color: #ffeede;
}



.buttons {
  filter: brightness(0) invert(1);
  background-color:transparent;
  border-color: transparent;
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

.buttons .button--transparent{
  background-color: transparent;
  border-color: transparent;
  color:white;
}
</style>
