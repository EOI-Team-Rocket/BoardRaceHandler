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
    
    <div id="buttons">
      <button class="buttons--style" @click="toggleModalDelete">
        <md-trash-icon w="70%" h="70%" />
      </button>
    </div>
    <div>
      <button class="buttons--style">
        <md-create-icon w="70%" h="70%" />
      </button>
    </div>
    <ModalDelete
      :show="deleteModalIsShown"
      :id="event._id"
      @hideModal="toggleModalDelete"
      @refreshList="refreshList"
      v-if="deleteModalIsShown"
    />
    <ModalForm
      :show="true"
      :edit="true"
      :id="event._id"
      v-if="editModalIsShown"
      @refreshList="refreshList"
      @hideFormModal="toggleModalEdit"
    />
  </div>
</template>

<script>
import ModalDelete from "@/components/ModalDelete.vue";
import ModalForm from "@/components/ModalForm.vue";
export default {
  name: "eventItem",
  props: {
    event: Object
  },
  components: {
    ModalDelete,
    ModalForm
  },
  data() {
    return {
      deleteModalIsShown: false,
      editModalIsShown: false
    };
  },
  methods: {
    toggleModalDelete() {
      this.deleteModalIsShown = !this.deleteModalIsShown;
    },
    toggleModalEdit() {
      this.editModalIsShown = !this.editModalIsShown;
    },
    refreshList() {
      this.$emit("refreshList");
    }
  }
};
</script>

<style scoped>
.color--white {
  color: #ffeede;
}

.buttons--style {
  filter: brightness(0) invert(1);
  background-color:transparent;
  border-color: transparent;
  max-height: 50%;
  max-width: 50%;
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
