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
                        <img>
                    </figure>
                    <button id="uploadImageButton">Subir Imagen</button>
                </div>
                <fieldset id="inputTextElements">
                    Título: <input name="title" type="text" class="inputTextElement">
                    Fecha: <input name="date" type="date" class="inputTextElement">
                    Hora: <input name="hour" type="time" class="inputTextElement">
                </fieldset>
            </div>
            <div id="upperCenterSection">
                <fieldset id="radioButtonsElements">
                    <span class="radioButtonElement" id="genderCategoryLabel">Sexo: </span>
                    <input type="radio" name="gender" value="male" class="radioButtonElement"> Masculino
                    <input type="radio" name="gender" value="female" class="radioButtonElement"> Femenino
                    <input type="radio" name="gender" value="mixed" class="radioButtonElement"> Mixto
                </fieldset>
            </div>
            <div id="bottomCenterSection">
                <div id="descriptionContainer">
                    <textarea id="description">
                    </textarea>
                </div>
                <div id="optionsContainer">
                    <select id="boatOptions" class="optionElement">  
                        <option v-for="boat in boats" :key="boat">{{boat}}</option>
                    </select>
                    <select id="ageOptions" class="optionElement">
                        <option v-for="age in ages" :key="age">{{age}}</option>
                    </select>
                    <select id="clubOptions" class="optionElement">
                        <option v-for="club in clubs" :key="club">{{club}}</option>
                    </select>
                </div>
            </div>
        </div>
        <template v-slot:modal-footer="{}">
            <div id="bottomSection">
                <div id="actionButtons">
                    <button class="actionButton" v-if="edit">BORRAR</button>
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
            clubs: ["Real Club Nautico"],
            formHeader: "",
            event: {
                title: ""
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

        },
        createEvent(){
            axios.post('http://localhost:3000/api/v1/events',{
                title: this.event.title,
                date: this.event.date,
                hour: this.event.hour,
                place: this.event.place,
                gender: this.event.gender,
                boat_category: this.event.boat_category,
                age_category: this.event.age_category,
                description: this.event.description,
                sailingClub: this.event.sailingClub
            })
            .then()
            .catch();
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
</script>

<style scoped>
.fillAll{
    width:  90vh;
    height: 90vh;
}

#description{
    resize: none;
}
</style>