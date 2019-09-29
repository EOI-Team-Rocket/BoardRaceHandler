<template>
  <div id="eventpage">
    <!--------------------------------Title of event --------------------------------------------->
   
    <h1 class="text-center text-white mt-4">{{data_events.title}}</h1>
    
    <!-------------------------------------------------------------------------------------------->

    
    <div class="d-flex">
      <!---------------------- Image and description of event. Left side --------------------------->
      <div class="ml-5 mt-3 container-img">
        <img
          v-if="data_events.image == undefined"
          class="card-img-top"
          src="../assets/regattaExample.jpg"
          alt="La imagen no se puede cargar"
        />

        <img 
          v-else
          class="card-img-top"
          :src="data_events.image"
          alt="La imagen no se puede cargar"
        />
      </div>
      <!-------------------------------------------------------------------------------------------->

      <!---------------------- Datas of events. Left right ----------------------------------------->
      
      <CardComponent :place="data_events.place" :category="data_events.category" :date="data_events.date" 
                         :manager="data_events.manager" :hour="data_events.hour" :gender="data_events.gender" 
                         :boat="data_events.boat_type" :capacity="data_events.capacity" class="cardComponent"/>
      <!-------------------------------------------------------------------------------------------->

      <!------------------------------------------Participants-------------------------------------->
      <div class="container">
        <div class="row">    
          <div class="col-12">
            <div class="ml-2 mt-3 card scroll-participants">
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-------------------------------------------------------------------------------------------->
    </div>


    <!-------------------------------------Description of event----------------------------------->
    <div class="d-flex">  
      <div class="ml-5 mt-3 card scroll-description">
        <div class="card-body">
          <h4>
            <strong>Descripción del evento</strong>
          </h4>
          <p>{{data_events.description}}</p>
        </div>
      </div>
    </div>
    
    <!-------------------------------------------------------------------------------------------->

    

    <!-------------------------------------Button of inscription----------------------------------->
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn-inscription mr-5 mt-3">Inscribirse</button>
    </div>
    <!--------------------------------------------------------------------------------------------->
  </div>
</template>


<script>
import axios from "axios";
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: "eventpage",
  data() {
    return {
      data_events: "",
      url_api: "http://localhost:3000/api/v1/events/",
    };
  },
  components: {
    CardComponent
  },
  methods: {
    getDataApi() {
      let urlId = this.$route.params.id;
      axios.get(this.url_api + urlId)
        .then(response => {
          /*Obtenemos todos los datos de la llamada axios.get */
          this.data_events = response.data;
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  created: function() {
    this.getDataApi();
  }
};
</script>

<style scoped>

.container-img{
  flex: 0 0 15%;
}

.card-img-top{
  height: 100%;
}

.cardComponent{
  flex: 0 0 40%;
}

.scroll-participants {
  max-height: 345px;
  overflow-y: auto;
  flex: 0 0 45%;
}

.scroll-description {
  max-height: 200px;
  overflow-y: auto;
  flex: 0 0 55%;
}

.border-design {
  padding: 3px 10px;
  border: PowderBlue 5px solid;
  border-radius: 20px;
  width: 400px;
  height: 50px;
}


.btn-inscription {
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
