<template>
    <div id='eventList'>
        <header id='eventsHeader' class="d-flex">
            <h2 class="headerItem">Nombre</h2>
            <h2 class="headerItem">Fecha</h2>
            <h2 class="headerItem">Lugar</h2>
        </header>
        <div id="itemList">
            <div v-for="event in events" :key="event._id" class="headerItem">
                <eventItem :event="event"/>
                <div id="buttonGroup">
                    <button>Eliminar</button>
                    <button>Editar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import eventItem from '@/components/eventItem.vue';
export default {
    name: 'eventList',
    components: {
        eventItem
    },
    data(){
        return{
            events: []
        }
    },
    methods: {
        getEvents(){
            axios.get("http://localhost:3000/api/v1/events")
            .then(events => {
                this.events=events.data.data;
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    created(){
        this.getEvents();
    }
}
</script>

<style scoped>

.headerItem{
    color: white;
}

#eventsHeader{
    justify-content: space-between;
}
</style>