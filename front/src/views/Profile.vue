<template>
  <div class="profile">
    <div class="info">
      <h2> Información deportiva </h2>
      <br/> 
      <p>Número de licencia: {{license_number}}</p>
      <div class="row">
        <p v-if="federation != ''">Federación: {{federation}}</p>
        <p v-if="club != ''">Club: {{club}}</p>
      </div>
      <div class="row">
        <p>Clase: {{class_boat}}</p> &nbsp;&nbsp;
        <p>Categoría: {{category}}</p>
      </div>
      <p>Estado: {{state}}</p>
      <p>Fecha de caducidad: {{expiration_date}}</p>
    </div>
    <div id="right">
      <div class="info">
        <h2> Información personal </h2>
        <div id="name">
          <p>Nombre: {{name}}</p>
          <p>Primer apellido: {{surname1}}</p>
        </div> 
        <p v-if="surname2 != '' ">Segundo apellido: {{surname2}}</p>
        <div id="sex">
          <p v-if="gender == 'M' ">Sexo: Masculino</p>
          <p v-else>Sexo: Femenino</p>
        </div>
      </div>
      <div class="info">
        <h2> Información cuenta de usuario </h2>
        <p>email: {{email}}</p>
        <p>Teléfono 1: {{telf1}}</p>
        <p v-if="telf2 != ''">Teléfono 2: {{telf2}}</p>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th class="text-white" scope="col">Evento</th>
          <th class="text-white" scope="col">Lugar</th>
          <th class="text-white" scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dataEvent, index) in dataEvents" :key="dataEvent._id">
          <th class="text-white" scope="row">{{index + 1}}</th>
          <td class="text-white">{{dataEvent.title}}</td> 
          <td class="text-white">{{dataEvent.place}}</td> 
          <td class="text-white">{{dataEvent.date}}</td>
        </tr>
      </tbody>
    </table>

    <button class="boton">Editar</button>
    <button class="boton" @click="deleteUser">Borrar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "profile",
  data() {
    return {
      user: {},
      name:"",
      surname1:"",
      surname2:"",
      email:"",
      gender:"",
      telf1:"",
      telf2:"",
      class_boat:"",
      category:"",
      state:"",
      license_number:"",
      expiration_date:"",
      club: "",
      federation: "",
      dataEvents: []
    };
  },
  methods: {
    deleteUser() {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const tkn = jwt.acces_token;
      const licenseNum = jwt.license_number;
      console.log("Bearer " + tkn);

      axios
        .delete("http://localhost:3000/api/v1/users/" + licenseNum, {
          headers: { Authorization: "Bearer " + tkn }
        })
        .then(res => {
          console.log("BORRADO");
          localStorage.removeItem("jwt");
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!localStorage.getItem("jwt")) {
      this.$router.replace("/");
    } else {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      if (jwt.license_number == this.$route.params.numLicense) {
        axios
          .get("http://localhost:3000/api/v1/users/" + jwt.license_number, {
             headers: { Authorization: "Bearer " + jwt.acces_token }
          })
          .then(res => {
            this.user = res.data;
            this.name = this.user.personalInfo.fullname.name;
            this.surname1 = this.user.personalInfo.fullname.surname1;
            this.surname2 = this.user.personalInfo.fullname.surname2;
            this.email = this.user.email;
            this.gender = this.user.personalInfo.gender;
            this.telf1 = this.user.telf1;
            this.telf2 = this.user.telf2;
            this.class_boat = this.user.sportInfo.class_boat;
            this.category = this.user.sportInfo.category;
            this.state = this.user.sportInfo.state;
            this.license_number = this.user.sportInfo.license_number;
            this.expiration_date = this.user.sportInfo.expiration_date;
            this.club = this.user.sportInfo.club;
            this.federation = this.user.sportInfo.federation;
            this.dataEvents = this.user.sportInfo.regattas;
          })
          .catch(err => {
            this.error = err;
          });
      } else {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style scoped>

.profile{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.info{
  display:flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 16px;
  background-color: rgba(132, 170, 232, 0.9);
  flex: 1 1 auto;
  justify-content: center;
  margin: 15px;
}

#right{
  display:flex;
  flex-direction: column;
  border-radius: 16px;
  flex: 1 1 auto;
}

h2{
  color:white;
  font-weight: bolder;
}

#right .info{
  display:flex;
  justify-content: center;
}

.info .row{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

p {
  color: white;
}

.boton{
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

.boton:hover{
  background: #9ed2ff;
  background-image: -webkit-linear-gradient(top, #577eff, #84abe8);
  background-image: -moz-linear-gradient(top, #577eff, #84abe8);
  background-image: -ms-linear-gradient(top, #577eff, #84abe8);
  background-image: -o-linear-gradient(top, #577eff, #84abe8);
  background-image: linear-gradient(to bottom, #577eff, #84abe8);
  text-decoration: none;
  border: none;
}
</style>
