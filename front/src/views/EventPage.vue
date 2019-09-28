<template>
  <div id="eventpage">
      <div id="uppermid">
        <img src="../assets/regattaExample.jpg" alt="imgEvent">
        <div id="generalInfo">
          <p>Titulo:{{event.title}}</p>
          <div id="dateTime">
            <p>Fecha: {{event.date}}&nbsp;&nbsp;</p>
            <p>&nbsp;&nbsp;Hora: {{event.hour}}</p>
          </div>
          <p>Lugar: {{event.place}}</p>
        </div>
      </div>
      <div id="lowermid">
        <div id="categoriesSex">
          <p>Categorias: {{event.boat_category}} {{event.age_category}} &nbsp;&nbsp;</p>
          <p>&nbsp;&nbsp;Sexo: {{event.gender}}</p>
        </div>
        <p>Descripcion: {{event.description}}</p>
        <div id="categoriesSex">
          <p id="entries">Participantes: {{event.participants}}&nbsp;&nbsp;</p>
          <p>&nbsp;&nbsp;Club Náutico: {{event.sailingClub}}</p>
        </div>
        <button type="submit" class="btn-inscription">Inscribirse</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:"eventpage",
  data(){
    return {
      event: {}
    }

  },
  created(){this.getEvent()},
  methods: {
    getEvent(){
      axios.post('http://localhost:3000/api/v1/events/event 1')
      .then(res =>{
        this.event = res.data[0];
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

#eventpage{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffeede;
}

#uppermid{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  
}

#uppermid img{
  padding-right: 20px;
}

#generalInfo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#dateTime{
  display:flex;
  flex-direction: row;
}

#categoriesSex{
  display:flex;
  flex-direction: row;
  justify-content: center;
}

#entries{
  overflow: scroll;
}

.btn-inscription{
  background: #84abe8;
  background-image: -webkit-linear-gradient(top, #84abe8, #577eff);
  background-image: -moz-linear-gradient(top, #84abe8, #577eff);
  background-image: -ms-linear-gradient(top, #84abe8, #577eff);
  background-image: -o-linear-gradient(top, #84abe8, #577eff);
  background-image: linear-gradient(to bottom, #84abe8, #577eff);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  font-family: Arial;
  color: #ffeede;
  font-size: 18px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
}

.btn-inscription:hover {
  background: #9ed2ff;
  background-image: -webkit-linear-gradient(top, #9ed2ff, #84c8e8);
  background-image: -moz-linear-gradient(top, #9ed2ff, #84c8e8);
  background-image: -ms-linear-gradient(top, #9ed2ff, #84c8e8);
  background-image: -o-linear-gradient(top, #9ed2ff, #84c8e8);
  background-image: linear-gradient(to bottom, #9ed2ff, #84c8e8);
  text-decoration: none;
  border: none;
}
</style>
