<template>
  <div id="eventpage">
    <!--------------------------------Title of event --------------------------------------------->
    <div class="d-flex justify-content-center">
      <h1 class="text-white mt-4">{{data_events.title}}</h1>
    </div>
    <!-------------------------------------------------------------------------------------------->


    <!---------------------- Image and description of event. Left side --------------------------->
    <div class="d-flex">
      <div class="card card-width ml-5 mt-3">
        <img class="card-img-top" src="../assets/regattaExample.jpg" alt="La imagen no se puede cargar" height="130px">
        <div class="card-header">
          <h4><b>Descripción del evento</b></h4>
        </div>
        <div class="card-body" data-spy="scroll" >
          <p class="card-text">{{data_events.description}}</p>
        </div>
      </div>
      <!-------------------------------------------------------------------------------------------->


      <!---------------------- Datas of events. Left right ----------------------------------------->
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="card ml-2 mt-3">
              <div class="card-body">
                <p class="card-text"><b>{{data_events.place}}</b></p>
              </div>
            </div>
          </div>
                
          <div class="col-6">    
            <div class="card ml-2 mt-3">
              <div class="card-body">
                <p class="card-text"><b>{{data_events.category}}</b></p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="card ml-2 mt-3">
              <div class="card-body">
                <p class="card-text"><b>{{data_events.date}}</b></p>
              </div>
            </div>
          </div>
                
          <div class="col-6">    
            <div class="card ml-2 mt-3">
              <div class="card-body">
                <p class="card-text"><b>{{data_events.manager}}</b></p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="card ml-2 mt-3">
              <div class="card-body">
                <p class="card-text"><b>{{data_events.hour}}</b></p>
              </div>
            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-12">
            <div class="card ml-2 mt-5">
              <div class="card-body">
                <p class="card-text"><b>Participantes</b></p>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <!-------------------------------------------------------------------------------------------->
    </div>

    <div class="d-flex justify-content-end">
      <button type="submit" class="btn-inscription mr-5 mt-5">Inscribirse</button>
    </div>
    
    
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name:"eventpage",
  data() {
    return {
      data_events: "",
      url_api: "http://localhost:3000/api/v1/events/",
      id_events: "5d8cba0a95a85d43b82f975f"
    }
  },
  methods: {
    getDataApi(){
      axios.get(this.url_api + this.id_events)
      .then(response => {
        /*Obtenemos todos los datos de la llamada axios.get */
        this.data_events = response.data;
      })
      .catch(error => {
        console.log(error.message);
      })
    }
  },

  created: function() {
    this.getDataApi();
      
  }
}

</script>

<style scoped>

.card-width{
  width: 30%;
}

.border-design{
  padding: 3px 10px;
  border: PowderBlue 5px solid;
  border-radius: 20px;
  width: 400px;
  height: 50px;

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
