<template>
  <div id="app">
    <div id="nav">
      <div id="nav--leftpart">
        <router-link to="/">Pagina principal</router-link>
          <b-dropdown id="dropdown" text="Embarcaciones" class="m-md-2">
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=420"> 420 </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=470"> 470 </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=29er"> 29-ER </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=crucero"> Crucero </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=hansa303"> Hansa 303 </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=ideal18"> Ideal 18 </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=j80"> J-80 </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=kiteboarding"> Kiteboarding </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=laser"> Laser </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=nacra17"> Nacra-17 </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=optimist"> Optimist </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=radiocontrol"> Radio Control </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=sinclase"> Sin Clase </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=snipe"> Snipe </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=tecno"> Tecno </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=velaadaptadaini"> Vela Adaptada Iniciación </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-boat"><router-link to="/event=windsurf"> Windsurf</router-link></b-dropdown-item-button>
          </b-dropdown>
          <b-dropdown id="dropdown" text="Edad" class="m-md-2">           
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=infantil"> Infantil </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=iniinfantil"> Iniciación Infantil </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=juvenil"> Juvenil </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=ampliacion"> Ampliacion </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=ampliacionautonomica"> Ampliacion de Autonomica </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=autonomica"> Autonomica </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-age"><router-link to="/event=senior"> Senior </router-link></b-dropdown-item-button>
          </b-dropdown>
          <b-dropdown id="dropdown" text="Sexo" class="m-md-2">
            <b-dropdown-item-button aria-describedby="dropdown-sex"><router-link to="/event=hombre"> Hombre </router-link></b-dropdown-item-button>
            <b-dropdown-item-button aria-describedby="dropdown-sex"><router-link to="/event=mujer"> Mujer </router-link></b-dropdown-item-button>
          </b-dropdown>
        <router-link to="/places">Lugares</router-link>
      </div>
      <div id="nav--rightpart">
        <router-link to="/dashboard" v-if="admin">Panel de control</router-link>
        <b-dropdown id="dropdown-form" right text="Iniciar Sesión" ref="dropdown" class="m-2">
          <b-dropdown-form class="dropdown-menu-right">
            <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent>
              <b-form-input
                id="dropdown-form-email"
                size="sm"
                placeholder="email@example.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Contraseña" label-for="dropdown-form-password">
              <b-form-input
                id="dropdown-form-password"
                type="password"
                size="sm"
                placeholder="Contraseña"
              ></b-form-input>
            </b-form-group>

            <b-form-checkbox class="mb-3">Recuérdame</b-form-checkbox>
            <b-button variant="primary" size="sm" @click="onClick">Regístrate</b-button>
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