<template>
    <div class="fillAll">
        <vodal :show="showModal" :width="900" :heigth="10000" animation="rotate" @hide="hideModal">
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
                        <span class="radioButtonElement" id="genderCategoryLabel">Sexo:</span>
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
                        <select id="boatOptions" class="optionElement">  <!--No se si los select necesitan el atributo "value"-->
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
                <div id="bottomSection">
                    <div id="actionButtons">
                        <button class="actionButton">BORRAR EVENTO</button>
                        <button v-if="!edit" @click="createEvent" class="actionButton">CREAR EVENTO</button>
                        <button v-else @click="updateEvent" class="actionButton">MODIFICAR EVENTO</button>
                    </div>
                </div>
            </div>
        </vodal>
    </div>
</template>

<script>
import Vue from "vue";
import Vodal from "vodal";
import axios from "axios";

Vue.component(Vodal.name, Vodal);

export default {
    name: 'ModalForm',
    props: ["show", "id"],
    data(){
        return{
            showModal: this.show,
            errors: [],
            boats: [],
            ages: [],
            clubs: []
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

        }
    },
    created(){ //I don't know if this works or we will have tu use "watch: $route" because Vue.js recycles components
        //fill input fields if we are editing an event
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