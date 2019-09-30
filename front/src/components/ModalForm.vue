<template>
    <b-modal v-model="showModal"  @hidden="hideModal">
        <template v-slot:modal-header>
            <header>{{formHeader}}</header>
            <div>
                <button @click="hideModal">X</button>
            </div>
        </template>
        <div v-if="errors.length" id="errorsContainer">
            <span v-for="(error, index) in errors" :key="error" >
                <span v-if="index!==errors.length-1" class="error">{{error+",&nbsp;"}} </span>
                <span v-else class="error">{{error+"."}}</span>
            </span>
        </div>
        <div id="eventFormContainer">
            <div id="upperSection">
                <div id="imageContentElement">
                    <figure id="imageContainer">
                        <img :src="event.image">
                    </figure>
                    <label for="uploadImageButton">Subir imagen</label>
                    <input id="uploadImageButton" type="file" accept="image/" @change="putImageInData">
                </div>
                <fieldset id="inputTextElements">
                    Título: <input name="title" type="text" class="inputTextElement" v-model="event.title">
                    Fecha: <input name="date" class="inputTextElement" type="date" v-model="event.date">
                    Hora: <input name="hour" type="time" class="inputTextElement" v-model="event.hour">
                </fieldset>
            </div>
            <div id="upperCenterSection">
                <fieldset id="radioButtonsElements">
                    <span class="radioButtonElement" id="genderCategoryLabel">Sexo: </span>
                    <input type="radio" name="gender" value="male" class="radioButtonElement" v-model="event.gender"> Masculino
                    <input type="radio" name="gender" value="female" class="radioButtonElement" v-model="event.gender"> Femenino
                    <input type="radio" name="gender" value="mixed" class="radioButtonElement" v-model="event.gender"> Mixto
                </fieldset>
                <div id="placeInputContainer">
                    Lugar: <input id="placeInput" name="place" type="text" v-model="event.place">
                </div>
                <div id="capacityInputContainer">
                    Aforo: <input id="capacityInput" name="capacity" type="number" min="1" v-model="event.capacity">
                </div>
            </div>
            <div id="bottomCenterSection">
                <div id="descriptionContainer">
                    <textarea id="description" v-model="event.description">
                    </textarea>
                </div>
                <div id="optionsContainer">
                    <select id="boatOptions" class="optionElement" v-model="event.class_boat">  
                        <option v-for="boat in boats" :key="boat">{{boat}}</option>
                    </select>
                    <select id="ageOptions" class="optionElement" v-model="event.category">
                        <option v-for="age in ages" :key="age">{{age}}</option>
                    </select>
                    <select id="managerOptions" class="optionElement" v-model="event.manager">
                        <option v-for="manager in managers" :key="manager">{{manager}}</option>
                    </select>
                </div>
            </div>
        </div>
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
import Vue from "vue";
import Vodal from "vodal";
import axios from "axios";

Vue.component(Vodal.name, Vodal);

export default {
    name: 'ModalForm',
    props: ["show", "id", "edit"],
    data(){
        return{
            showModal: this.show,
            errors: [],
            boats: ["420", "470", "29-ER", "49-ER", "Crucero", "Hansa 303", "Ideal 18", "J-80", "Kiteboarding",
            "Laser 4.7", "Laser Radial", "Nacra-17", "Optimist", "Radio Control", "Sin Clase", "Snipe",
            "Thecno", "Vela Adaptada Iniciacion", "Windsurf/Fun Board", "Windsurf/RSX", "Windsurf/Velocidad"],
            ages: ["Infantil", "Iniciacion Infantil", "Juvenil", "Senior", "Ampliacion", 
            "Ampliacion de Autonomica", "Autonomica"],
            managers: ["Real Club Nautico"],
            formHeader: "",
            event: {
                title: null,
                date: null,
                hour: null,
                place: null,
                image: null,
                gender: null,
                class_boat: null,
                category: null,
                description: null,
                capacity: null,
                manager: null,
                participants: []
            }
        }
    },
    methods: {
        hideModal(){ 
            this.showModal = false;
            this.updateFatherStatus();
        },
        updateFatherStatus() {
            this.$emit("refreshList");
            this.$emit("hideFormModal");
        },
        updateEvent(){
            if(!this.formValidation()) return;
        },
        createEvent(){
            if(!this.formValidation()) return;
            this.translateGender();
            axios.post('http://localhost:3000/api/v1/events',this.event)
            .then(res => {
                 this.hideModal();
            })
            .catch(err => {
                console.log(err);
                this.errors.push("Error al conectar con la base de datos");
            });
        },
        deleteEvent(){

        },
        formValidation(){
            this.errors=[];
            this.dateTimeValidator();
            if(!this.event.title) this.errors.push("El título del evento es obligatorio");
            if(!this.event.place) this.errors.push("El lugar es obligatorio");
            if(!this.event.gender) this.errors.push("Hay que seleccionar una opción en 'sexo'");
            if(!this.event.class_boat) this.errors.push("La clase es obligatoria");
            if(!this.event.category) this.errors.push("La categoría es obligatoria");
            if(!this.event.description) this.errors.push("La descripción es obligatorio");
            if(!this.event.manager) this.errors.push("El club naútico es obligatorio");
            if(this.errors.length>0) return false;
            return true;
        },
        dateTimeValidator(){ //enviar los mensajes si falla dependiendo del fallo Validar que el día no sea pasado
            let today = new Date();
            today=today.getTime();
            let eventDay = new Date(this.event.date);
            eventDay = eventDay.getTime();
            if(eventDay<today) this.errors.push("No se puede introducir una fecha anterior a la actual");
            this.event.date = new Date(this.event.date);
            return;
        },
        putImageInData(){ //to implement maybe will need event.target
            return;
        },
        translateGender(){
            switch(this.event.gender){
                case "Masculino":
                    this.event.gender="M";
                    break;
                case "Femenino":
                    this.event.gender="F";
                default:
                    this.event.gender="X";
            }
        }
    },
    created(){ //I don't know if this works or we will have tu use "watch: $route" because Vue.js recycles components
        if(this.id){//fill input fields if we are editing an event
            this.formHeader="Modificar Evento";
            return;
        } else {
            this.formHeader="Crear Evento";
        }
    }
}
//rellenar los campos input si estamos editando
</script>

<style scoped>

#description{
    resize: none;
}
</style>
