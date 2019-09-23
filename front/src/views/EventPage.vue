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
          <p> Participantes: {{regattaEntries}} </p> <!-- dropdown to do -->
          <p> Club Náutico: {{regattaSailorClub}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name:"eventpage"
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

</style>
