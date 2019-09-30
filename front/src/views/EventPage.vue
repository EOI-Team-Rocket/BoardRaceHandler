<template>
  <div id="eventpage">
    <!--------------------------------Title of event --------------------------------------------->
    <div class="d-flex justify-content-center">
      <h1 class="text-white mt-4">{{data_events.title}}</h1>
    </div>
    <!-------------------------------------------------------------------------------------------->

    <!---------------------- Image and description of event. Left side --------------------------->
    <div class="d-flex">
      <div class="ml-5 mt-3">
        <img
          class="card-img-top"
          :src="data_events.image"
          alt="La imagen no se puede cargar"
          height="300px"
        />
      </div>
      <!-------------------------------------------------------------------------------------------->

      <!---------------------- Datas of events. Left right ----------------------------------------->
      <div class="container">
        <div class="row">
          <CardComponent :data="data_events.place" />
          <CardComponent :data="data_events.category" />
        </div>

        <div class="row">
          <CardComponent :data="data_events.date" />
          <CardComponent :data="data_events.manager" />
        </div>

        <div class="row">
          <CardComponent :data="data_events.hour" />

          <div class="col-6">
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

    <div class="ml-5 mt-3 card scroll-description">
      <div class="card-body">
        <h4>
          <strong>Descripción del evento</strong>
        </h4>
        <p>{{data_events.description}}</p>
        <p>Contenido de Relleno</p>
        <p>Contenido de Relleno</p>
        <p>Contenido de Relleno</p>
        <p>Contenido de Relleno</p>
        <p>Contenido de Relleno</p>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <p v-if="error != ''">{{error}}</p>
      <button v-if="stateBtn" @click="inscription" class="btn-inscription mr-5 mt-3">Inscribirse</button>
      <button v-else @click="unSubcription" class="btn-inscription mr-5 mt-3">Desinscribirse</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import CardComponent from "@/components/CardComponent.vue"; /* fix this */

export default {
  name: "eventpage",
  data() {
    return {
      data_events: "",
      id_events: "",
      stateBtn: true,
      error: ""
    };
  },
  components: {
    CardComponent
  },
  methods: {
    getDataApi() {
      axios
        .get("http://localhost:3000/api/v1/events/" + this.id_events)
        .then(response => {
          /*Obtenemos todos los datos de la llamada axios.get */
          console.log(this.url_api + this.id_events);
          this.data_events = response.data;
          const jwt = JSON.parse(localStorage.getItem("jwt"));
          if(jwt != null){
            if(this.data_events.participants.indexOf(jwt.id) != -1) this.stateBtn = false; 
          }
        })
        .catch(error => {
          this.error = error;
        });
    },
    inscription(){
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      this.error = "";
      if(jwt != null){
        const ids = {
          userId: jwt.id,
          eventId: this.id_events
        };
        axios.post("http://localhost:3000/api/v1/registerInEvent", ids).then(res => {
          this.stateBtn = false;
          this.getDataApi();
          
        }).catch(err => {
          this.error = err
        });  
      }else{
        this.error = "Debe estar autenticado para poder inscribirse"
      }
      
    },
    unSubcription(){
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const ids = {
        userId: jwt.id,
        eventId: this.id_events
      };
      axios.post("http://localhost:3000/api/v1/unSubscription", ids)
      .then(res => {
        this.stateBtn = true;
        this.getDataApi();
            }).catch(err => {
              this.error = err
            });  
    }
  },


  created() {
    this.id_events = this.$route.query.id;
    this.getDataApi();
  }
};
</script>

<style scoped>
.scroll-participants {
  max-height: 150px;
  overflow-y: auto;
}

.scroll-description {
  max-height: 200px;
  overflow-y: auto;
  width: 1365px;
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
  font-size: 15px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: none;
}

.btn-inscription:hover {
  background: #9ed2ff;
  background-image: -webkit-linear-gradient(top, #577eff, #84abe8);
  background-image: -moz-linear-gradient(top, #577eff, #84abe8);
  background-image: -ms-linear-gradient(top, #577eff, #84abe8);
  background-image: -o-linear-gradient(top, #577eff, #84abe8);
  background-image: linear-gradient(to bottom, #577eff, #84abe8);
  text-decoration: none;
  border: none;
}
</style>
