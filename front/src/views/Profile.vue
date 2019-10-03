<template>
  <div class>
    <p>Nombre: {{name}}</p>
    <p>Primer apellido: {{surname1}}</p>
    <p>Segundo apellido: {{surname2}}</p>
    <p>email: {{email}}</p>
    <p v-if="gender == 'M' ">Sexo: Masculino</p>
    <p v-else>Sexo: Femenino</p>
    <p>Teléfono 1: {{telf1}}</p>
    <p v-if="telf2 != ''">Teléfono 2: {{telf2}}</p>
    <p>Clase: {{class_boat}}</p>
    <p>Categoría: {{category}}</p>
    <p>Estado: {{state}}</p>
    <p>Número de licencia: {{license_number}}</p>
    <p>Fecha de caducidad: {{expiration_date}}</p>
    <p v-if="club != ''">Club: {{club}}</p>
    <p v-if="federation != ''">Federación: {{federation}}</p>

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

    <button v-if="false">Editar</button>
    <button @click="deleteUser">Borrar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "profile",
  data() {
    return {
      user: {},
      name: "",
      surname1: "",
      surname2: "",
      email: "",
      gender: "",
      telf1: "",
      telf2: "",
      class_boat: "",
      category: "",
      state: "",
      license_number: "",
      expiration_date: "",
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
p {
  color: white;
}
</style>
