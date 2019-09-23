<template>
  <div class="hello">
    <h1>Eventos</h1>
    <ul v-for="event in events" :key=event>
      <div class="event">
        <div class="image">
          <img :src="event.thumbnail">
        </div>
        <div class="info">
          <router-link :to="{ name: 'event', params: {id:event.id}}"> {{event.title}}</router-link>
          <p>Fecha del evento: {{event.date}}</p>
          <p>Categoria: {{event.category}}</p>
          <p> Lugar: {{event.place}}</p>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      events: []
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
