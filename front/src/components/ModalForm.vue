<template>
  <b-modal v-model="showModal" @hidden="hideModal" id="modal-scrollable" size="lg">
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
        </div>
        <!-- TITLE DATE HOUR -->
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
</template>

<script>
import axios from "axios";

export default {
  name: "ModalForm",
  props: ["show", "id", "edit"],
  data() {
    return {
      showModal: this.show,
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
    hideModal() {
      this.showModal = false;
      this.updateFatherStatus();
    },
    updateFatherStatus() {
      this.$emit("refreshList");
      this.$emit("hideFormModal");
    },
    updateEvent() {
      if (!this.formValidation()) return;
    },
    createEvent() {
      this.translateGender();
      if (true) {
        var finalDate = this.boatEvent.date.split("-");
        axios
          .post("http://localhost:3000/api/v1/events", {
            title: this.boatEvent.title,
            date: this.boatEvent.date,
            hour: this.boatEvent.hour,
            place: this.boatEvent.place,
            image: this.boatEvent.image,
            gender: this.boatEvent.gender,
            class_boat: this.boatEvent.class_boat,
            category: this.boatEvent.category,
            description: this.boatEvent.description,
            capacity: this.boatEvent.capacity,
            manager: this.boatEvent.manager,
            participants: this.boatEvent.participants
          })
          .then(res => {
            this.hideModal();
          })
          .catch(err => {
            this.errors.push("Error al conectar con la base de datos");
          });
      }
    },
    deleteEvent() {},
    formValidation() {
      console.log("starting form validation");
      if (
        !this.isDateOk() ||
        this.boatEvent.title.length <= 0 ||
        this.boatEvent.place.length <= 0 ||
        this.boatEvent.gender.length <= 0 ||
        this.boatEvent.class_boat.length <= 0 ||
        this.boatEvent.category.length <= 0 ||
        this.boatEvent.description.length <= 0 ||
        this.boatEvent.manager.length <= 0
      ) {
        console.log(this.isDateOk());
        console.log(boatEvent);
        console.log("ese formulario es  mierda");
        return false;
      } else {
        return true;
      }
    },
    isDateOk() {
      console.log("starting date validation");
      let today = new Date().getTime();
      let boatEventDay = new Date(this.boatEvent.date).getTime();
      if (boatEventDay < today) {
        return false;
      } else {
        this.boatEvent.date = new Date(this.boatEvent.date);
        return true;
      }
    },
    putImageInData() {
      //to implement maybe will need boatEvent.target
      return;
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
    console.log("hola?");
    if (this.id) {
      //fill input fields if we are editing an boatEvent
      this.formHeader = "Modificar Evento";
      return;
    } else {
      this.formHeader = "Crear Evento";
    }
  }
};
//rellenar los campos input si estamos editando
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
