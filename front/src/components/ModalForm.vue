<template>
<div class="modal" id="modal-scrollable___BV_modal_outer_"> 
    <b-modal
      :no-close-on-backdrop="false"
      v-model="showModal"
      @hidden="hideModal"
      id="modal-scrollable"
      size="lg"
      class="map"
    >
      <!-- HEADER -->
      <template v-slot:modal-header>
        <div>
          <h5>{{formHeader}}</h5>
        </div>
        <div>
          <button @click="hideModal">X</button>
        </div>
      </template>
      <!-- FORM -->
      <div id="form-column form-container">
        <!-- TOP SECTION -->
        <div class="form-row">
          <!-- IMG -->
          <div class="form-column">
            <div class></div>
            <div id="imageContainer">
              <img
                class="boatEvent-img"
                :src="boatEvent.image?boatEvent.image:'https://www.churchtrac.com/articles/apple/uploads/2017/09/Antu_insert-image.svg_-846x846.png'"
              />
            </div>
            <div class="form-row">
              <label>Subir imagen</label>
              <input id="uploadImageButton" type="file" accept="image/" @change="putImageInData" />
            </div>
            <div class="form-column">
              <label>
                Título:
                <span class="error" v-if="boatEvent.title==''">*</span>
              </label>
              <input name="title" type="text" class="inputTextElement" v-model="boatEvent.title" />
              <label>
                Fecha:
                <span class="error" v-if="boatEvent.date==''">*</span>
              </label>
              <input name="date" class="inputTextElement" type="date" v-model="boatEvent.date" />
              <label>
                Hora:
                <span class="error" v-if="boatEvent.hour==''">*</span>
              </label>
              <input name="hour" type="time" class="inputTextElement" v-model="boatEvent.hour" />
            </div>
          </div>
          <!-- TITLE DATE HOUR -->
          <div class="form-column">
            
            <div class="form-column">
              <GMap/>
            </div>
          </div>
        </div>
        <!-- MIDDLE SECTION -->
        <div class="form-row second-section">
          <!-- GENDER -->
          <div class="form-column">
            <div class="form-row">
              <label class="radioButtonElement" id="genderCategoryLabel">
                Sexo:
                <span class="error" v-if="boatEvent.gender==''">*</span>
              </label>
            </div>
            <div class="form-column gender-class">
              <div class="form-row">
                <label>Masculino</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  class="radioButtonElement"
                  v-model="boatEvent.gender"
                />
              </div>
              <div class="form-row">
                <label>Femenino</label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  class="radioButtonElement"
                  v-model="boatEvent.gender"
                />
              </div>
              <div class="form-row">
                <label>Mixto</label>
                <input
                  type="radio"
                  name="gender"
                  value="mixed"
                  id="mixed"
                  class="radioButtonElement"
                  v-model="boatEvent.gender"
                />
              </div>
            </div>
          </div>
          <!-- BOAT -->
          <div class="form-column">
            <div class="form-column">
              <label>
                Barco:
                <span class="error" v-if="boatEvent.class_boat==''">*</span>
              </label>
              <select id="boatOptions" class="optionElement" v-model="boatEvent.class_boat">
                <option v-for="boat in boats" :key="boat">{{boat}}</option>
              </select>
            </div>
            <div class="form-column">
              <label>
                Categoria:
                <span class="error" v-if="boatEvent.category==''">*</span>
              </label>
              <select id="ageOptions" class="optionElement" v-model="boatEvent.category">
                <option v-for="age in ages" :key="age">{{age}}</option>
              </select>
            </div>
            <div class="form-column">
              <label>
                Club Náutico:
                <span class="error" v-if="boatEvent.manager==''">*</span>
              </label>
              <select id="managerOptions" class="optionElement" v-model="boatEvent.manager">
                <option v-for="manager in managers" :key="manager">{{manager}}</option>
              </select>
            </div>
          </div>
          <!-- PLACE AND CAPACITY -->
          <div class="form-column">
            <label>
              Lugar:
              <span class="error" v-if="boatEvent.place==''">*</span>
            </label>
            <input id="placeInput" name="place" type="text" v-model="boatEvent.place" />
            <label>Aforo:</label>
            <input
              id="capacityInput"
              name="capacity"
              type="number"
              min="1"
              v-model="boatEvent.capacity"
            />
          </div>
        </div>
        <!-- DESCRIPTION -->
        <div class="form-row">
          <b-form-textarea
            placeholder="Descripción..."
            v-model="boatEvent.description"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
      </div>
      <!-- FOOTER -->
      <template v-slot:modal-footer="{}">
        <div id="bottomSection">
          <div id="actionButtons">
            <button class="actionButton" v-if="edit" @click="deleteEvent">BORRAR</button>
            <button v-if="!edit" @click="createEvent" class="actionButton">CREAR EVENTO</button>
            <button v-else @click="updateEvent" class="actionButton">MODIFICAR EVENTO</button>
          </div>
        </div>
      </template>
    </b-modal>
</div>

</template>

<script>
import axios from "axios";
import GMap from "@/components/GMapForm.vue";

export default {
  name: "ModalForm",
  props: ["show", "id", "edit"],
  components: {
    GMap
  },
  data() {
    return {
      key: localStorage.getItem("drivenToken"),
      showModal: this.show,
      img: null,
      eventImage:
        "https://cdn4.iconfinder.com/data/icons/text-editor-2/24/Insert-Image-512.png",
      errors: [],
      boats: [
        "420",
        "470",
        "29-ER",
        "49-ER",
        "Crucero",
        "Hansa 303",
        "Ideal 18",
        "J-80",
        "Kiteboarding",
        "Laser 4.7",
        "Laser Radial",
        "Nacra-17",
        "Optimist",
        "Radio Control",
        "Sin Clase",
        "Snipe",
        "Thecno",
        "Vela Adaptada Iniciacion",
        "Windsurf/Fun Board",
        "Windsurf/RSX",
        "Windsurf/Velocidad"
      ],
      ages: [
        "Infantil",
        "Iniciacion Infantil",
        "Juvenil",
        "Senior",
        "Ampliacion",
        "Ampliacion de Autonomica",
        "Autonomica"
      ],
      managers: ["Real Club Nautico"],
      formHeader: "",
      boatEvent: {
        title: "",
        date: "",
        hour: "",
        place: "",
        image: "",
        gender: "",
        class_boat: "",
        category: "",
        description: "",
        capacity: "",
        manager: "",
        participants: []
      }
    };
  },
  methods: {
    deleteToken() {
      localStorage.removeItem("driveToken");
    },
    hideModal() {
      this.showModal = false;
      this.updateFatherStatus();
    },
    updateFatherStatus() {
      this.$emit("refreshList");
      this.$emit("hideFormModal");
    },
    updateEvent() {
      if (this.formValidation()) {
        const place = JSON.parse(localStorage.getItem("place")); 
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        const tkn = jwt.acces_token;
        axios
          .patch("http://localhost:3000/api/v1/events/" + this.id, {
            title: this.boatEvent.title,
            date: this.boatEvent.date,
            hour: this.boatEvent.hour,
            place: place.place,
            cord: {
              lng: place.marker.lng,
              lat: place.marker.lat
            },
            image: this.boatEvent.image,
            gender: this.boatEvent.gender,
            class_boat: this.boatEvent.class_boat,
            category: this.boatEvent.category,
            description: this.boatEvent.description,
            capacity: this.boatEvent.capacity,
            manager: this.boatEvent.manager,
            participants: this.boatEvent.participants
          }, 
          { headers: { Authorization: "Bearer " + tkn }})
          .then(res => {
            this.hideModal();
          })
          .catch(err => {
            console.log(err)
            this.errors.push("Error al conectar con la base de datos");
          });
      }
    },
    async createEvent() {
      this.translateGender();
      if (this.formValidation() && (await this.uploadToDrive())) {
        const place = JSON.parse(localStorage.getItem("place")); 
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        const tkn = jwt.acces_token;
        axios
          .post("http://localhost:3000/api/v1/events", {
            title: this.boatEvent.title,
            date: this.boatEvent.date,
            hour: this.boatEvent.hour,
            place: place.place,
            cord: {
              lng: place.marker.lng,
              lat: place.marker.lat
            },
            image: this.boatEvent.image,
            gender: this.boatEvent.gender,
            class_boat: this.boatEvent.class_boat,
            category: this.boatEvent.category,
            description: this.boatEvent.description,
            capacity: this.boatEvent.capacity,
            manager: this.boatEvent.manager,
            participants: this.boatEvent.participants
          }, 
          { headers: { Authorization: "Bearer " + tkn }})
          .then(res => {
            localStorage.removeItem("place");
            this.hideModal();
          })
          .catch(err => {
            this.errors.push("Error al conectar con la base de datos");
          });
      }
    },
    deleteEvent() {
      axios
        .delete("http://localhost:3000/api/v1/events/" + this.id)
        .then(res => {
          this.$emit("refreshList");
          this.$emit("hideFormModal");
        });
    },
    formValidation() {
      const place = JSON.parse(localStorage.getItem("place"));
      if (
        !this.isDateOk() ||
        this.boatEvent.title.length <= 0 ||
        place.place.length <= 0 ||
        this.boatEvent.gender.length <= 0 ||
        this.boatEvent.class_boat.length <= 0 ||
        this.boatEvent.category.length <= 0 ||
        this.boatEvent.description.length <= 0 ||
        this.boatEvent.manager.length <= 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    isDateOk() {
      let today = new Date().getTime();
      let boatEventDay = new Date(this.boatEvent.date).getTime();
      if (boatEventDay < today) {
        return false;
      } else {
        this.boatEvent.date = this.boatEvent.date;
        return true;
      }
    },
    putImageInData(event) {
      var reader = new FileReader();
      this.eventImage = event.target.files[0];
      this.img = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.eventImage = reader.result;
      };
    },
    uploadToDrive() {
      var clientId =
        "51550627371-6hoi4aai0pqudi8cmbk0k8p71f97agau.apps.googleusercontent.com";
      var redurect_uri = "http://localhost:8080/#/dashboard";
      var scope = "https://www.googleapis.com/auth/drive";
      var driveToken = localStorage.getItem("drivenToken");

      if (driveToken != "" && driveToken != null) {
        var config = {
          params: {
            uploadType: "media",
            mimeType: "image/*",
            addParents: "1QNloRgiX8CrcqIEvvQFzR5yw74LyXkwP"
          },
          headers: {
            Authorization: "Bearer " + driveToken
          }
        };
        return axios
          .post(
            "https://www.googleapis.com/upload/drive/v3/files",
            this.img,
            config
          )
          .then(image => {
            console.log(image);
            var config = {
              headers: {
                Authorization: "Bearer " + driveToken
              }
            };
            return axios
              .post(
                "https://www.googleapis.com/drive/v2/files/" +
                  image.data.id +
                  "/parents",
                {
                  id: "1QNloRgiX8CrcqIEvvQFzR5yw74LyXkwP"
                },
                config
              )
              .then(res => {
                console.log(res);
                this.boatEvent.image =
                  "https://drive.google.com/uc?id=" +
                  image.data.id +
                  "&export=download";
                return true;
              })
              .catch(err => {
                console.log(err);
                return false;
              });
          })
          .catch(err => {
            console.log(err);
            return false;
          });
      } else {
        this.singInDrive(clientId, redurect_uri, scope);
        return false;
      }
    },
    singInDrive(clientId, redirect_uri, scope) {
      var url =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        "client_id=" +
        clientId +
        "&redirect_uri=http://localhost:8080&prompt=consent&response_type=token&scope=" +
        scope;
      window.open(url);
    },
    translateGender() {
      switch (this.boatEvent.gender) {
        case "Masculino":
          this.boatEvent.gender = "M";
          break;
        case "Femenino":
          this.boatEvent.gender = "F";
        default:
          this.boatEvent.gender = "X";
      }
    }
  },

  created() {
    if (this.id) {
      axios.get("http://localhost:3000/api/v1/events/" + this.id).then(res => {
        this.boatEvent = res.data;
        switch (this.boatEvent.gender) {
          case "F":
            var radiobtn = document.getElementById("female");
            radiobtn.checked = true;
            break;
          case "M":
            var radiobtn = document.getElementById("male");
            radiobtn.checked = true;
            break;
          default:
            var radiobtn = document.getElementById("mixed");
            radiobtn.checked = true;
            break;
        }
        this.formHeader = "Modificar Evento";
      });
    } else {
      this.formHeader = "Crear Evento";
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.form-container {
  margin: 0%;
}
.second-section {
  align-items: center;
}
.gender-class .form-row {
  border: 1px solid black;
  margin-top: 3px;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
}
.form-row {
  display: flex;
  justify-content: space-between;
}
.form-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1%;
}
.boatEvent-img {
  height: 100%;
  width: 100%;
}

#imageContainer {
  max-height: 70%;
  max-width: 30%;
}




</style>