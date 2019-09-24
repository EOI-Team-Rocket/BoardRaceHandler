<template>
    <div class="create">
            <div v-if="errors.length" class="errors">
                <span v-for="(error, index) in errors" :key="error" >
                    <span class="error" v-if="index!==errors.length-1">{{error+",&nbsp;"}} </span>
                    <span class="error" v-else>{{error+"."}}</span>
                </span>
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="title">Título:</label>
                    <b-form-input class="bg-input" id="title" v-model="event.title" :state="titleState" 
                    aria-describedby="input-live-help input-live-feedback" placeholder="Título"></b-form-input>
                </div>
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="date">Fecha:</label>
                    <b-form-input class="sm-input" id="date" type="date" v-model="date"></b-form-input>
                </div>
                <div role="group" class="sub-group">
                    <label class="input-label" for="hour">Hora:</label>
                    <b-form-input class="sm-input" id="hour" type="time" v-model="event.hour"></b-form-input>
                </div>
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="input-live">Descripción:</label>
                    <b-form-textarea class="bg-input description" id="description" v-model="event.description" 
                    :state="descriptionState" aria-describedby="input-live-help input-live-feedback" 
                    placeholder="Descripción"></b-form-textarea>
                </div>
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="place">Lugar:</label>
                    <b-form-input class="sm-input" id="place" v-model="event.place" 
                    :state="placeState" aria-describedby="input-live-help input-live-feedback" 
                    placeholder="Lugar" trim></b-form-input>
                </div>
                <div role="group" class="sub-group">
                    <fieldset id="gender">
                        <span class="label-gender" id="legend-gender">Sexo: </span>
                        <div class="radios-group">
                            <div class="radio-value">
                                <label class="input-label" for="male">Hombre</label>
                                <input type="radio" value="H" name="gender" v-model="event.gender" class="radio">
                            </div>
                            <div class="radio-value">
                                <label class="input-label" for="female">Mujer</label>
                                <input type="radio" value="M" name="gender" v-model="event.gender" class="radio">
                            </div>
                            <div class="radio-value">
                                <label class="input-label" for="x">Mixto</label>
                                <input type="radio" value="X" name="gender" v-model="event.gender" class="radio">
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="boat_category">Categoria de Barco:</label>
                    <b-form-select v-model="event.boat_category" :options="boats" size="sm" 
                    class="sm-input" id="boat_category"></b-form-select>
                </div>
                <div role="group" class="sub-group">
                    <label class="input-label" for="age_category">Categoria de Edad:</label>
                    <b-form-select v-model="event.age_category" :options="competitions" size="sm" 
                    class="sm-input" id="age_category"></b-form-select>
                </div>
                
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="input-live">Competición:</label>
                    <b-form-select v-model="event.competition" :options="competitions" size="sm" class="sm-input"></b-form-select>
                </div>
                <div role="group" class="sub-group">
                    <label class="input-label" for="input-live">Club Naútico:</label>
                    <b-form-select v-model="event.sailingClub" :options="competitions" size="sm" class="sm-input"></b-form-select>
                </div>
            </div>

            <div class="group">
                <div role="group" class="sub-group">
                    <label class="input-label" for="input-live">Imagen:</label>
                    <b-form-input class="sm-input" id="text" type="image" v-model="event.image" placeholder="Imagen"></b-form-input>
                </div>
                <div role="group" class="sub-group">
                    <label class="input-label" for="input-live">Limite de Participantes:</label>
                    <b-form-input class="sm-input" id="capacity" type="number" v-model="event.capacity"></b-form-input>
                </div>
            </div>
            <div class="btn">
                <button v-if="!edit" @click="checkForm" class="btn-create">CREAR EVENTO</button>
                <button v-else @click="checkForm" class="btn-create">MODIFICAR EVENTO</button>
            </div>     


            {{date}}

            {{event}}
    </div>


</template>

<script>

import axios from "axios"

export default {
    name: 'FormCreate',
    props: ["id"],
    data(){
        return {
            edit: false,
            stateTitle: null,
            stateDescription: null,
            statePlace: null,
            competitions: [
                { value: null, text: 'Seleccionar una opción' },
                { value: 'Race boat 1', text: 'Race boat 1' },
                { value: 'Race boat 2', text: 'Race boat 2' },
                { value: 'Race boat 3', text: 'Race boat 3' },
                { value: 'Race boat 4', text: 'Race boat 4' }
            ],
            boats: [
                { value: null, text: 'Seleccionar una opción' },
                { value: '420', text: '420' },
                { value: 'crucero', text: 'Crucero' },
                { value: 'optimist', text: 'Optimist' },
                { value: 'er-29', text: 'ER-29' }
            ],
            ages: [
                { value: null, text: 'Seleccionar una opción' },
                { value: '420', text: '420' },
                { value: 'Crucero', text: 'Crucero' },
                { value: 'Race boat 3', text: 'Race boat 3' },
                { value: 'Race boat 4', text: 'Race boat 4' }
            ],
            errors: [],
            event: {
                title: null,
                date: null,
                hour: null,
                place: null,
                image: null,
                gender: null,
                boat_category: null,
                age_category: null,
                description: null,
                capacity: null,
                sailingClub: null,
                competition: null,
                participants: []
            },
            date: null,
        }
    },
    computed: {
        titleState() {
        if(this.event.title == null){
                return this.stateTitle;
            }else{
                this.stateTitle = this.event.title.length > 10 ? true : false;
                return this.stateTitle;
            }
        },
        descriptionState(){
            if(this.event.description == null){
                return this.stateDescription;
            }else{
                this.stateDescription = this.event.description.length > 140 ? true : false;
                return this.stateDescription;
            }
        },
        placeState() {
            if(this.event.place == null){
                return this.statePlace;
            }else{
                this.statePlace = this.event.place.length > 5 ? true : false;
                return this.statePlace;
            }
        },
    },
    methods:{
        checkForm(){
            this.errors = [];
            if(!this.event.title) this.errors.push("El Título es requerido");
            if(!this.stateTitle && this.event.title) this.errors.push("El Título es demasiado corto");
            this.checkDate(this.date);
            if(!this.event.hour) this.errors.push("La Hora es requerida");
            if(!this.event.description) this.errors.push("La Descripción es requerida");
            if(!this.stateDescription && this.event.description) this.errors.push("La Descripción es demasiado corta");
            if(!this.event.place) this.errors.push("El Lugar es requerido");
            if(!this.statePlace && this.event.place) this.errors.push("El Lugar es demasiado corto");
            if(!this.event.gender) this.errors.push("El Sexo es requerido");
            if(!this.event.boat_category) this.errors.push("La Categría de Barco es requerida");
            if(!this.event.age_category) this.errors.push("La Categría de Edad es requerida");
            if(!this.event.sailingClub) this.errors.push("El Club Naútico es requerido");

            this.createEvent();

            //if(this.errors.length == 0 && this.edit==false) this.createEvent();
            //if(this.errors.length == 0 && this.edit==true) this.editEvent();

        },
        checkDate(date){
            if(!date) {
                this.errors.push("La Fecha es requerida");
            } else {
                const today = new Date();
                const arrayDate = date.split("-");
                const dateDb = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0];
                if (arrayDate[0] < today.getFullYear()){
                    this.errors.push("La fecha no es valida");
                } else {
                    if (arrayDate[1] < today.getMonth()){
                       this.errors.push("La fecha no es valida");
                    } else {
                        if (arrayDate[2] < today.getDate()){
                            this.errors.push("La fecha no es valida");
                        } else {
                            this.event.date = dateDb;
                        }
                    } 
                }
            }
        },
        createEvent(){
            axios.post('http://localhost:3000/api/v1/createEvent', this.event).then(res => {
                this.$router.push("/CRUDevents");
            }).catch(err => {
                this.errors.push("ERROR AL CONECTAR CON LA BASE DE DATOS");
            });   
        },
        editEvent(){
            axios.patch('http://localhost:3000/api/v1/events/'+this.id, this.event).then(res => {
                this.$router.push("/CRUDevents");
            }).catch(err => {
                this.errors.push("ERROR AL CONECTAR CON LA BASE DE DATOS");
            });  
        }
    },
    created(){
        this.edit=false;
        if(this.id != null && this.id != undefined){
            this.edit=true;
            axios.get('http://localhost:3000/api/v1/events/'+this.id).then(res => {
                this.event=res.data;
            }).catch(err => {
                this.errors.push("ERROR AL CONECTAR CON LA BASE DE DATOS");
            });
        }
    }
    
}
</script>

<style scoped>
    .create {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 10px 15%;
    }

    .sm-input {
        margin: 10px;
        display: flex;
        flex: 1;
    }
    .bg-input {
        margin: 10px;
        display: flex;
        flex: 1;
    }
    .group {
        display: flex;
        justify-content: space-around;
    }
    .sub-group{
        display: flex;
        flex: 1;
    }
    .input-label{
        display: flex;
        margin: auto;
        color: #FFEEDE;
    }
    .errors {
        display: flex;
        flex-wrap: wrap;
    }
    .error {
        color: rgb(255, 179, 179);
    }
    #description {
        height: 250px;
        resize: none;

    }
    #gender{
        margin: 0 5px;
    }
    #legend-gender{
        font-weight: bold;
        text-align: left;
        width: auto;
        color: #FFEEDE;
    }
    fieldset {
        display: flex;
        flex: 1;
    }
    .radios-group {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
    }
    .radio-value {
        display: flex;
        flex-direction: row;
    }
    .radio {
        margin: auto;
    }
    #submit {
        border-radius: 10px;
        border: none;
        padding: 5px 10px;
        color: #FFEEDE;
        background-color: #222299;
         
    }
    .btn-create{
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
    .btn-create:hover {
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
