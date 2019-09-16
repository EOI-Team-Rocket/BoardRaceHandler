<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/categories">Categorias</router-link> |
      <router-link to="/places">Lugares</router-link>  |
      <router-link to="/login"> Iniciar sesión </router-link> <!-- login ugly  -->  |
      <router-link to="/registration"> Registrarse </router-link>  |
      <router-link to="/CRUD.events"> Administrar eventos </router-link>  |
    </div>
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
