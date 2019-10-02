<template>
  <div class>
    <p>Nombre: {{}}</p>
    <p>Primer apellido: {{}}</p>
    <p>Segundo apellido: {{}}</p>
    <p>email: {{}}</p>
    <p>Sexo: Masculino</p>
    <p>Sexo: Femenino</p>
    <p>Teléfono 1: {{}}</p>
    <p v>Teléfono 2: {{}}</p>
    <p>Clase: {{}}</p>
    <p>Categoría: {{}}</p>
    <p>Estado: {{}}</p>
    <p>Número de licencia: {{}}</p>
    <p>Fecha de caducidad: {{}}</p>
    <p>Club: {{}}</p>
    <p>Federación: {{}}</p>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Evento</th>
          <th scope="col">Lugar</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(regatta, index) in user" :key="regatta._id">
          <th scope="row">{{index + 1}}</th>
          <td>{{regatta.title}}</td>
          <td>{{regatta.place}}</td>
          <td>{{regatta.date}}</td>
        </tr>
      </tbody>
    </table>

    <button>Editar</button>
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
      personalInfo: "",
      sportInfo: ""
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
            this.user = JSON.parse(res.data);
            console.log(JSON.parse(res.data));

            this.personalInfo = res.data.personalInfo;
            this.sportInfo = res.data.sportInfo;

            
          })
          .catch(err => {
            this.error = err;
            console.log("Mal");
            
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
