<template>
  <div id="eventpage">
    <!--------------------------------Title of event --------------------------------------------->

    <h1 class="text-center text-white mt-4">{{data_events.title}}</h1>

    <!-------------------------------------------------------------------------------------------->

    <div class="d-flex">
      <!---------------------- Image and description of event. Left side --------------------------->
      <div class="ml-5 mt-3 container-img">
        <img class="card-img-top" :src="data_events.image" />
      </div>
      <!-------------------------------------------------------------------------------------------->

      <!---------------------- Datas of events. Left right ----------------------------------------->

      <CardComponent
        :place="data_events.place"
        :category="data_events.category"
        :date="data_events.date"
        :manager="data_events.manager"
        :hour="data_events.hour"
        :gender="data_events.gender"
        :boat="data_events.class_boat"
        :capacity="data_events.capacity"
        class="cardComponent"
      />
      <!-------------------------------------------------------------------------------------------->

      <!------------------------------------------Participants-------------------------------------->

      <div class="ml-2 mt-3 card scroll-participants">
        <div class="card-body">
          <h1>Participantes Inscritos</h1>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Primer Apellido</th>
                <th scope="col">Segundo Apellido</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data_event, index) in data_events.participants" :key="data_event._id">
                <th scope="row">{{index + 1}}</th>
                <td>{{data_event.personalInfo.fullname.name}}</td>
                <td>{{data_event.personalInfo.fullname.surname1}}</td>
                <td>{{data_event.personalInfo.fullname.surname2}}</td>
              </tr>
            </tbody>
          </table>
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
      <p v-if="error != ''" class="error">{{error}}</p>
      <button v-if="stateBtn" @click="inscription" class="btn-inscription mr-5 mt-3">Inscribirse</button>
      <button v-else @click="unSubcription" class="btn-inscription mr-5 mt-3">Desinscribirse</button>
    </div>
    <!--------------------------------------------------------------------------------------------->
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
          this.data_events = response.data;
          const jwt = JSON.parse(localStorage.getItem("jwt"));
          if (jwt != null) {
            const user = this.data_events.participants.filter(data =>
              data._id.includes(jwt.id)
            );
            if (user.length > 0) this.stateBtn = false;
          }
        })
        .catch(error => {
          this.error = error;
        });
    },
    inscription() {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const tkn = jwt.acces_token;
      this.error = "";
      if (jwt != null) {
        const ids = {
          userId: jwt.id,
          eventId: this.id_events
        };
        console.log(jwt.acces_token);

        axios
          .post("http://localhost:3000/api/v1/registerInEvent", ids, {
            headers: { Authorization: "Bearer " + tkn }
          })
          .then(res => {
            console.log(res);

            this.stateBtn = false;
            this.getDataApi();
          })
          .catch(err => {
            this.error = err;
          });
      } else {
        this.error = "Debe estar autenticado para poder inscribirse";
      }
    },
    unSubcription() {
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      const tkn = jwt.acces_token;
      const ids = {
        userId: jwt.id,
        eventId: this.id_events
      };
      console.log(jwt.acces_token);

      axios
        .post("http://localhost:3000/api/v1/unSubscription", ids, {
          headers: { Authorization: "Bearer " + tkn }
        })
        .then(res => {
          this.stateBtn = true;
          this.getDataApi();
        })
        .catch(err => {
          this.error = err;
        });
    }
  },

  created() {
    this.id_events = this.$route.params.id;

    this.getDataApi();
  }
};
</script>

<style scoped>
.container-img {
  flex: 0 0 25%;
}

.card-img-top {
  height: 100%;
}

.cardComponent {
  flex: 0 0 30%;
}

.scroll-participants {
  max-height: 345px;
  overflow-y: auto;
  flex: 0 0 40%;
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
