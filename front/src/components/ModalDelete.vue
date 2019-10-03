<template>
  <div id="vodal">
    <vodal id="vodal" :show="show" animation="rotate" @hide="hideModal" height=120> <!--No consigo cambiar el color del fondo-->
    <div class="vodal-dialog">
      <p>¿Esta seguro que quiere eliminar este evento?</p>
      <div id="buttons">
        <button @click="deleteEvent">SI</button>
        <button @click="hideModal">NO</button>
      </div>
    </div>
    </vodal>
  </div>
</template>

<script>
import Vue from "vue";
import Vodal from "vodal";
import axios from "axios";

Vue.component(Vodal.name, Vodal);

export default {
  name: "ModalDelete",
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
      this.updateFatherStatus();
    },
    updateFatherStatus() {
      this.$emit("refreshList");
      this.$emit("hideModal");
    },
    deleteEvent() {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const tkn = jwt.acces_token;
      axios
        .delete("http://localhost:3000/api/v1/events/" + this.id, {
          headers: { Authorization: "Bearer " + tkn }})
        .then(info => {
          this.updateFatherStatus();
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

#vodal{
  display: flex;
}

p{
  color:black;
}

#buttons{
  display:flex;
  justify-content: flex-end;
}

button{
  background: #84abe8;
  background-image: -webkit-linear-gradient(top, #84abe8, #577eff);
  background-image: -moz-linear-gradient(top, #84abe8, #577eff);
  background-image: -ms-linear-gradient(top, #84abe8, #577eff);
  background-image: -o-linear-gradient(top, #84abe8, #577eff);
  background-image: linear-gradient(to bottom, #84abe8, #577eff);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  color: #ffeede;
  font-size: 15px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
  
}

button:hover {
  background: #9ed2ff;
  background-image: -webkit-linear-gradient(top, #577eff, #84abe8);
  background-image: -moz-linear-gradient(top, #577eff, #84abe8);
  background-image: -ms-linear-gradient(top, #577eff, #84abe8);
  background-image: -o-linear-gradient(top, #577eff, #84abe8);
  background-image: linear-gradient(to bottom, #577eff, #84abe8);
  text-decoration: none;
  border: none;
}

#vodal .vodal-dialog{
  background:rgb(158, 210, 255);
}

</style>
