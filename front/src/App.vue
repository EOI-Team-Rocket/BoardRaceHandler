<template>
  <div id="app">
    <div id="nav">
      <div id="nav--leftpart">
        <router-link to="/">Pagina principal</router-link>
          <b-dropdown id="dropdown" text="Embarcaciones" class="m-md-2">
            <b-dropdown-item-button aria-describedby="dropdown-boat" v-for="boat in boats" :key="boat.id"><router-link :to="{name: 'events', params: {name: boat.id} }"> {{boat.name}} </router-link></b-dropdown-item-button>
          </b-dropdown>
          <b-dropdown id="dropdown" text="Edad" class="m-md-2">
            <b-dropdown-item-button aria-describedby="dropdown-boat" v-for="age in ages" :key="age.id"><router-link :to="{name: 'events', params: {name: age.id} }"> {{age.name}} </router-link></b-dropdown-item-button>           
          </b-dropdown>
          <b-dropdown id="dropdown" text="Sexo" class="m-md-2">
            <b-dropdown-item-button aria-describedby="dropdown-boat" v-for="gender in genders" :key="gender.id"><router-link :to="{name: 'events', params: {name: gender.id} }"> {{gender.name}} </router-link></b-dropdown-item-button>
          </b-dropdown>
        <router-link to="/places">Lugares</router-link>
        <router-link to="/eventpage">Evento</router-link> <!-- this is a test for the layout-->
      </div>
      <div id="nav--rightpart">
        <router-link to="/dashboard">Panel de control</router-link>
        <b-dropdown v-if="loginState" id="dropdown-form" right text="Iniciar Sesión" ref="dropdown" class="m-2" > <!-- disapear when login-->
          <b-dropdown-form class="dropdown-menu-right">
            <h2 id="error" v-if="error.status" >{{error.message}}</h2>
            <b-form-group label="Email" label-for="dropdown-form-email" >
              <b-form-input v-model="user.email"
                id="dropdown-form-email"
                size="sm"
                placeholder="email@example.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Contraseña" label-for="dropdown-form-password">
              <b-form-input v-model="user.password"
                id="dropdown-form-password"
                type="password"
                size="sm"
                placeholder="Contraseña"
              ></b-form-input>
            </b-form-group>

            <b-form-checkbox class="mb-3">Recuérdame</b-form-checkbox>
            <b-button variant="primary" size="sm" @click="login">Inicia sesión</b-button>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button>Regístrate</b-dropdown-item-button>
          <b-dropdown-item-button>¿Contraseña olvidada?</b-dropdown-item-button>
        </b-dropdown>
      </div>
    </div>

    <aside>
      <!-- here goes the aside for the second sprint-->
    </aside>

    <router-view/>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  name: "app",
  data(){ 
    return {
      boats: [
        {
          name: "Crucero",
          id: "crucero"
        },
        {
          name: "ER-29",
          id: "er-29"
        },
        {
          name: "Hansa 303",
          id: "hansa_303"
        },
        {
          name: "Optimist",
          id: "optimist"
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
          name: "Ampliación",
          id: "extension"
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
        }
      ],
      user:{
        email: '',
        password:''
      },
      error: {
				status: false,
				message: ''
			},
      jwt: "",
      loginState: true
    }
  },

  methods: {
    login() {
      console.log("he entrado en el login baby");
      if(this.user.email == '' || this.user.password == ''){
        console.log("VACIOS");
				return;
			}
			this.error.status = false;
      this.error.message = '';
      console.log(this.user);
      
			axios.post('http://localhost:3000/api/v1/login', this.user)
				.then(res => {
        localStorage.setItem('jwt', JSON.stringify(res.data));
        this.loginState = false;
				})
				.catch(err => {
					if(err.response && err.response.status == 400) {
						this.error.status = true;
						this.error.message = "Wrong email or password";
					}else {
						this.error.status = true;
						this.error.message = "Connection error";
					}
				}) 
/*       this.$store.dispatch('retrieveToken', {
        email:this.email,
        password:this.password
      }) */
    }
  },
  created(){
    console.log(localStorage.getItem('jwt'));
    const storage = localStorage.getItem('jwt')
    if (storage != null){
      this.loginState = false;
    }else{
      this.loginState = true;
    }
    
  }
}
</script>


<style>

body {
  background-image: url('./assets/background.jpg');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display:flex;
  justify-content: space-between;
  background-color:rgba(158, 210, 255, 0.6);
}

#nav a {
  font-weight: bold;
  color: #222299;
  text-decoration: none;
  padding: 15px;
  font-weight: normal;
}

#nav a:hover {
  padding: 15px;
  color: black;
  font-weight: bold;
}

.routerdropdown {
  color:mediumblue;
}

#nav .dropdown-menu{
  background-color: rgba(132, 170, 232, 0.5);
  color:#FFEEDE;
  font-weight: bold;
}

#nav .dropdown-menu a{
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #FFEEDE;
  font-weight: bold;
}

#nav--rightpart {
  margin: 20px;
}

#nav--leftpart {
  margin: 20px;
}

#nav .btn-secondary {
  color: #222299;
  background-color: transparent;
  border-color: transparent;
}

#nav .btn-secondary:hover {
  font-weight: bold;
}

#nav .btn-secondary.disabled, .btn-secondary:disabled {
  color: #fff;
}

#nav .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #fff;
}

</style>
