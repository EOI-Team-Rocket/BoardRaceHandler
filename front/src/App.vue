<template>
  <div id="app">
    <div id="nav">
      <div id="nav--leftpart">
        <router-link to="/">Pagina principal</router-link> | 
        <router-link to="/categories">Categorias</router-link> |
        <router-link to="/places">Lugares</router-link>
      </div>
      <div id="nav--rightpart">
        <router-link to="/dashboard" v-if="admin">Panel de control</router-link>
        <router-link to="/login"> Iniciar sesión </router-link> <!-- login ugly  -->  |
        <router-link to="/registration"> Registrarse </router-link>
      </div>
    </div>

    <aside>

    </aside>

    <router-view/>
  </div>
  
</template>

<style>
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
  background-color:#577EFF;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #222299;
}

#nav a.router-link-exact-active {
  color: #FFEEDE;
}

</style>
