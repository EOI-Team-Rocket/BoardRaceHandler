<template>
  <div id="app">
    <div id="nav">
      <div id="nav--leftpart">
        <router-link to="/">Pagina principal</router-link>
        <b-dropdown id="dropdown" text="Embarcaciones" class="m-md-2">
          <b-dropdown-item-button
            aria-describedby="dropdown-boat"
            v-for="boat in boats"
            :key="boat.id"
            class="alwaysBlack"
          >
            <router-link :to="{name: 'events', params: {name: boat.id} }">{{boat.name}}</router-link>
          </b-dropdown-item-button>
        </b-dropdown>
        <b-dropdown id="dropdown" text="Edad" class="m-md-2">
          <b-dropdown-item-button
            aria-describedby="dropdown-boat"
            v-for="age in ages"
            :key="age.id"
            class="alwaysBlack"
          >
            <router-link :to="{name: 'events', params: {name: age.id} }">{{age.name}}</router-link>
          </b-dropdown-item-button>
        </b-dropdown>
        <b-dropdown id="dropdown" text="Sexo" class="m-md-2">
          <b-dropdown-item-button
            aria-describedby="dropdown-boat"
            v-for="gender in genders"
            :key="gender.id"
            class="alwaysBlack"
          >
            <router-link :to="{name: 'events', params: {name: gender.id} }">{{gender.name}}</router-link>
          </b-dropdown-item-button>
        </b-dropdown>
      </div>
      <div id="nav--rightpart">
        <router-link to="/dashboard" v-if="role === 'ADMIN'">Panel de control</router-link>
        <b-dropdown
          v-if="!loginState"
          id="dropdown-form"
          right
          text="Iniciar Sesión"
          ref="dropdown"
          class="m-2"
        >
          <b-dropdown-form class="dropdown-menu-right">
            <p id="error" v-if="error.status">{{error.message}}</p>
            <b-form-group label="Email" label-for="dropdown-form-email">
              <b-form-input
                v-model="user.email"
                id="dropdown-form-email"
                size="sm"
                placeholder="email@example.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Contraseña" label-for="dropdown-form-password">
              <b-form-input
                v-model="user.password"
                id="dropdown-form-password"
                type="password"
                size="sm"
                placeholder="Contraseña"
              ></b-form-input>
            </b-form-group>
            <b-button class="btn-login" variant="primary" size="sm" @click="login">Inicia sesión</b-button>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <router-link to="/register"><b-dropdown-item-button>Regístrate</b-dropdown-item-button></router-link>
          <b-dropdown-item-button>¿Contraseña olvidada?</b-dropdown-item-button>
        </b-dropdown>
        <div class v-else>
          <router-link :to="{name: 'profile', params: {numLicense: numLicense} }">Perfil</router-link>
          <button id="logout" @click="logOut">Log Out</button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      boats: [
        {
          name: "420",
          id: "420"
        },
        {
          name: "470",
          id: "470"
        },
        {
          name: "ER-29",
          id: "er-29"
        },
        {
          name: "ER-49",
          id: "er-49"
        },
        {
          name: "Crucero",
          id: "crucero"
        },
        {
          name: "Hansa 303",
          id: "hansa_303"
        },
        {
          name: "Ideal 18",
          id: "ideal-18"
        },
        {
          name: "J-80",
          id: "j-80"
        },
        {
          name: "Kiteboarding",
          id: "kiteboarding"
        },
        {
          name: "Laser 4.7",
          id: "laser_4.7"
        },
        {
          name: "Laser Radial",
          id: "laser_radial"
        },
        {
          name: "Nacra-17",
          id: "nacra-17"
        },
        {
          name: "Optimist",
          id: "optimist"
        },
        {
          name: "Radio Control",
          id: "radio_control"
        },
        {
          name: "Snipe",
          id: "snipe"
        },
        {
          name: "Thecno",
          id: "thecno"
        },
        {
          name: "Vela Adaptada Iniciacion",
          id: "vela_adaptada_iniciacion"
        },
        {
          name: "Windsurf/Fun Board",
          id: "windsurf/fun_board"
        },
        {
          name: "Windsurf/RSX",
          id: "windsurf/rsx"
        },
        {
          name: "Windsurf/Velocidad",
          id: "windsurf/velocidad"
        }
      ],
      ages: [
        {
          name: "Infantil",
          id: "childish"
        },
        {
          name: "Iniciación Infantil",
          id: "child_initiation"
        },
        {
          name: "Juvenil",
          id: "youth"
        },
        {
          name: "Senior",
          id: "senior"
        },
        {
          name: "Ampliación",
          id: "extension"
        },
        {
          name: "Ampliacion de Autonomica",
          id: "automaty_extension"
        },
        {
          name: "Autonomica",
          id: "automaty"
        }
      ],
      genders: [
        {
          name: "Hombre",
          id: "male"
        },
        {
          name: "Mujer",
          id: "female"
        },
        {
          name: "Mixto",
          id: "mixto"
        }
      ],
      user: {
        email: "",
        password: ""
      },
      error: {
        status: false,
        message: ""
      },
      role: "",
      loginState: false,
      numLicense: ""
    };
  },

  methods: {
    login(){
      console.log("he entrado en el login baby");
      if (this.user.email == "" || this.user.password == "") {
        return;
      }
      this.error.status = false;
      this.error.message = "";
      console.log(this.user);

      axios
        .post("http://localhost:3000/api/v1/login", this.user)
        .then(res => {
          localStorage.setItem("jwt", JSON.stringify(res.data));
          this.loginState = true;
          this.numLicense = JSON.parse(
            localStorage.getItem("jwt")
          ).license_number;
          this.role = JSON.parse(localStorage.getItem("jwt")).role;
          console.log(this.role);
        })
        .catch(err => {
          if (err.response && err.response.status == 401) {
            this.error.status = true;
            this.error.message = "Email o contraseña erroneo";
          } else {
            this.error.status = true;
            this.error.message = "Error de conexion";
          }
        });
    },
    logOut() {
      this.loginState = false;
      this.role = "";
      this.numLicense = "";
      localStorage.removeItem("jwt");
    }
  },
  created() {
    const storage = JSON.parse(localStorage.getItem("jwt"));
    if (storage != null) {
      this.role = storage.role;
      this.numLicense = storage.license_number;
      this.loginState = true;
    } else {
      this.loginState = false;
    }
  }
};
</script>


<style>
@font-face {
  font-family: font;
  src: url("./assets/Fragmentcore.otf");
}

body {
  background-image: url("./assets/background.jpg");
}

.alwaysBlack{
    color: #2c3e50;
}

#app {
  font-family: font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 18px;
}
#nav {
  display: flex;
  justify-content: space-between;
  background-color: rgba(158, 210, 255, 0.6);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 15px;
  font-weight: bolder;
}

#nav a:hover {
  padding: 15px;
  color: black;
  font-weight: bolder;
}

.routerdropdown a {
  color: #2c3e50;
}

#nav .dropdown-menu {
  background-color: rgba(132, 170, 232, 0.9);
  font-weight: bolder;
}

#nav .dropdown-menu a {
  font-weight: bolder;
  
}

#nav a.router-link-exact-active {
  font-weight: bolder;
}

#nav--rightpart {
  margin: 20px;
}

#nav--leftpart {
  margin: 20px;
}

#nav .btn-secondary {
  color: black;
  font-size: 18px;
  background-color: transparent;
  border-color: transparent;
}

#nav .btn-secondary:hover {
  font-weight: bolder;
}

#nav .btn-secondary.disabled,
.btn-secondary:disabled {
  color: #fff;
}

#nav .btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #fff;
}

#logout{
  background-color: transparent;
  border-color: transparent;
  font-weight: bolder;
}

.btn-login {
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

.btn-login:hover {
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
