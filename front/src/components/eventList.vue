<template>
    <div>
        <p v-if="error">
            {{error}}
        </p>
        <button class="btn btn-dark" id="collapseButton" @click="toggleState">{{collapse==true ? 'Mostrar más' : 'Mostrar menos'}}</button>
        <button class="btn btn-dark" id="createEventButton" @click="goToCreate">Crear evento</button>
        <div v-for="event in events" :key="event._id" class="d-flex flex-wrap justify-content-center eventItem">
            <div class="fillAllRow" id="titleRow">
                <span id="eventTitle" >
                    Título: {{event.title}}
                </span>
            </div>
            <div v-if="collapse==false" class="fillAllRow">
                <div v-if="event.image"> 
                    <img :src="event.image" id="eventImage">
                </div>
                <div v-else> 
                    <img src="../../default_image.jpg" id="eventImage">
                </div>
            </div>
            <div class="fillAllRow p-2 d-flex justify-content-center">
                <div class="d-flex justify-content-start flex-wrap ml-5 eventDataContainer">
                    <div class="w-90 mb-2 eventRowContainer">
                        <span id="eventPlace" class="eventDataBox">
                            Lugar: {{event.place}}
                        </span>
                        <span id="eventDate" class="eventDataBox">
                            Fecha: {{event.date}}
                        </span>
                        <span id="eventHour" class="eventDataBox">
                            Hora: {{event.hour}}
                        </span>
                        <span id="eventGender" class="eventDataBox">
                            Sexo: {{event.gender}}
                        </span>
                        <span id="eventCategory" class="eventDataBox">
                            Categoría: {{event.category}}
                        </span>
                    </div>
                    <div class="w-90 eventRowContainer">
                        <span v-if="event.capacity" id="eventCapacity" class="eventDataBox">
                            Aforo: {{event.capacity}}
                        </span>
                        <span id="eventClub" class="eventDataBox">
                            Club Naútico: {{event.sailingClub}}
                        </span>
                        <span v-if="event.competition" id="eventCompetition" class="eventDataBox">
                            Forma parte de la competición: {{event.competition}}
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="collapse==false" class="fillAllRow" id="descriptionRowContainer">
                <span class="blackEventDataBox">
                    Descripción: {{event.description}}
                </span>
            </div>
            <div v-if="event.participants && collapse==false" id="eventParticipants" class="fillAllRow d-flex justify-content-center eventRowContainer">
                <div class="blackEventDataBox">
                    <span>Participantes: </span>
                    <span v-for="(participant, index) in event.participants" :key="participant">
                        <span v-if="index!==event.participants.length-1">{{participant+", "}}</span>
                        <span v-else>{{participant+"."}}</span>
                    </span>
                </div>
            </div>
            <div class="fillAllRow eventRowContainer">
                <span id="createdAt" class="eventDataBox">
                    Creado en el día {{event.createdAt.substring(0,10)}}, a la hora {{event.createdAt.substring(12,16)}}
                </span>
            </div>
            <div class="fillAllRow d-flex justify-content-center">
                <div class="eventDataBox" id="buttonGroup">
                    <button class="btn btn-primary" @click="editEvent(event._id)">Modificar evento</button>
                    <button class="btn btn-primary" @click="deleteEvent(event)">Borrar evento</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "eventList",
    data(){
        return {
           events: [],
           error: "",
           collapse: true
        }
    },
    methods: {
        getAll(){ 
            axios.get("http://localhost:3000/api/v1/events")
            .then(events => {
                this.events=events.data.data.reverse();
            })
            .catch(err => {
                this.error=err;
            })
        },
        deleteEvent(event){ //voy por aquí
            axios.delete("http://localhost:3000/api/v1/deleteEvent/"+event._id)
            .then(info => {
                this.getAll();
            })
            .catch(err => {
                this.error=err+" --> En cristiano: error en consulta delete a la base de datos de eventos";
            });
        },
        toggleState(){
            if(this.collapse==true){
                this.collapse=false;
            } else {
                this.collapse=true;
            }
        },
        goToCreate(){
            this.$router.push("/create"); 
        },
        editEvent(id){ //call the create with query param
            this.$router.push("/create?id="+id);
        }
    },
    created(){
        this.getAll();   
    }
}
</script>
<style scoped>

button{
    margin: 0.5vh;
}

.eventItem{
    margin: 2vh 20vh;
    padding: 1vh;
    border: 1px solid black;
    background-color: #84aeb8; 
} 

.fillAllRow{
    width: 100%;
    margin: 1vh;
    border: 1px solid white;
    background-color: #9ed2ff;
}

.eventDataBox{
    margin: 0.5vh;
    padding: 0.4vh;
    background-color: white;
    border: 1px solid #577eff;
    font-size: 1.8vh;
    /* color: #577eff; */
    color: black;
}

.blackEventDataBox{
    margin: 0.5vh;
    padding: 0.4vh;
    background-color: white;
    border: 1px solid black;
    font-size: 1.8vh;
    color: black;
}

.eventDataContainer{
    margin-top: 1vh;
    margin-bottom: 1vh;
}

.eventRowContainer{
    padding: 0.8vh;
}

 #eventTitle{
    font-size: 3.5vh;
    Color: black;
    padding: 0.5vh;
    background-color: white;
    border: 2px solid black;
 }

#eventImage{
    max-width: 100%;
    max-height: 100%;
    margin: 1vh;
    border: 2px solid white;
}

#titleRow{
    padding: 1vh 0vh;
}

#descriptionRowContainer{
    padding: 2vh;
}

#buttonGroup{
    border-radius: 4px;
}

#createEventButton{
    width: 30vh;
    height: 4vh;
}
</style>