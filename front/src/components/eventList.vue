<template>
    <div>
        <div v-for="event in events" :key="event._id">
            <span id="eventTitle">
                Título: {{event.title}}
            </span>
            <span id="eventDate">
                Fecha: {{event.date}}
            </span>
            <span id="eventHour">
                Hora: {{event.hour}}
            </span>
            <span id="eventPlace">
                Lugar: {{event.place}}
            </span>
            <div v-if="event.image" id="eventImage"> 
                <img :src="event.image">
            </div>
            <span id="eventGender">
                Sexo: {{event.gender}}
            </span>
            <span id="eventCategory">
                Categoría: {{event.category}}
            </span>
            <span id="eventDescription">
                Descripción: {{event.description}}
            </span>
            <span v-if="event.capacity" id="eventCapacity">
                Aforo: {{event.capacity}}
            </span>
            <span id="eventClub">
                Club Naútico: {{event.sailingClub}}
            </span>
            <span id="createdAt">
                Creado en: {{event.createdAt}}
            </span>
            <span v-if="event.competition" id="eventCompetition">
                Forma parte de la competición: {{event.competition}}
            </span> 
            <div v-if="event.participants" id="eventParticipants">
                <span v-for="participant in event.participants" :key="participant">{{participant}}</span>
            </div>
            <button>Modificar evento</button>
            <button>Borrar evento</button>
        </div>
        <button>Crear evento</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "eventList",
    data(){
        return {
           events: [1,2,3,4],
           foo: 0
        }
    },
    methods: {
        // getAll(){ //mirar como llamamos a esto cada vez que se pagine este evento
        //     axios.get("caca")
        //     .then(events => {
        //         this.events=events.data;
        //         this.title=this.events.title;
        //     })
        // }
    },
    created(){
        this.getAll();   
    }
}
</script>