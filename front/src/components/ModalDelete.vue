<template>
  <div class>
    <vodal :show="show" animation="rotate" @hide="hideModal">
      <p>¿Esta seguro que quiere eliminar este evento?</p>
      <button @click="deleteEvent">SI</button>
      <button @click="hideModal">NO</button>
    </vodal>
  </div>
</template>

<script>
import Vue from "vue";
import Vodal from "vodal";
import axios from "axios";

Vue.component(Vodal.name, Vodal);

export default {
  name: "app",
  props: {
    show: Boolean,
    id: String
  },
  data() {
    return {
      showComp: this.show
    };
  },
  methods: {
    hideModal() {
      this.showComp = false;
      this.updateCoachStatus();
    },
    updateCoachStatus() {
      this.$emit("refreshList");
      this.$emit("hideModal", this.showComp);
    },
    deleteEvent() {
      axios
        .delete("http://localhost:3000/api/v1/events/" + this.id)
        .then(info => {
          this.updateCoachStatus();
        })
        .catch(err => {
          this.error =
            err +
            " --> En cristiano: error en consulta delete a la base de datos de eventos";
        });
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/vodal/common.css";
@import "../../node_modules/vodal/rotate.css";
</style>