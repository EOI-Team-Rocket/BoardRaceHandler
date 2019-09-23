<template>
  <div id="eventpage">
      <div id="uppermid">
        <img src="../assets/regattaExample.jpg" alt="imgEvent">
        <div id="generalInfo">
          <p>Titulo:{{regattaName}}</p>
          <div id="dateTime">
            <p>Fecha: {{regattaDate}}  </p>
            <p>Hora: {{regattaHour}}</p>
          </div>
          <p>Lugar: {{regattaPlace}}</p>
        </div>
      </div>
      <div id="lowermid">
        <div id="categoriesSex">
          <p> Categorias: {{regattaCategories}} </p>
          <p>Sexo: {{regattaSex}}</p>
        </div>
        <p>Descripcion: {{regattaDescription}}</p>
        <div id="categoriesSex">
          <p id="entries"> Participantes: {{regattaEntries}} </p>
          <p> Club Náutico: {{regattaSailorClub}}</p>
        </div>
        <button type="submit">Inscribirse</button>
      </div>
  </div>
</template>

<script>
export default {
  name:"eventpage",
  /* introduce the things */
  
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

button{
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

button:hover {
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
