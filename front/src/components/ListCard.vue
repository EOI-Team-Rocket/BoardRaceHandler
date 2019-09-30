<template>
    <div class="listcard">
        <div class="d-flex flex-wrap">
            <div v-for="showEvent in showEvents" :key="showEvent._id">
                <router-link class="d-flex" :to="{name: 'eventpage', params: {id: showEvent._id} }">
                    <CardAnimation :title="showEvent.title" :place="showEvent.place" :date="showEvent.date" 
                                :img="showEvent.image"/>
                </router-link>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-5" v-if="showEvents != null">
            <!--------------------------------------------Flecha de retorno------------------------------------------------>
            <button type="button" v-if="page >= 3"  @click="previous" class="btn btn-md btn-dark">
                &laquo;
            </button>
            <!-------------------------------------------------------------------------------------------------------------->

            <!--------------------------------------------Numeros de la paginacion------------------------------------------>
            <div v-for="index in pages" class="page" :key="index">
                <button class="btn btn-md btn-dark" @click="changePage(index)" v-if="index < 1 || index > numberPages" 
                        :class="{select: index == page, invisible: index < 1 || index > numberPages}"> </button>
                <button class="btn btn-md btn-dark" @click="changePage(index)" 
                        v-else :class="{select: index == page}">{{index}}</button>
            </div>
            <!-------------------------------------------------------------------------------------------------------------->
            
            <!--------------------------------------------Flecha de siguiente------------------------------------------------>
            <button type="button" v-if="page < numberPages-2" @click="next" class="btn btn-md btn-dark">
                &raquo;
            </button>
            <!-------------------------------------------------------------------------------------------------------------->
        </div>
    </div>
    
</template>

<script>
import axios from "axios";

import CardAnimation from '@/components/CardAnimation.vue';

export default {
    name:"listcard",
    data() {
        return {
            data_events:[],
            url_api: "http://localhost:3000/api/v1/events",
            page: 1,
            numberPages:0,
            limit:8,
            showEvents:[],
            pages:[]
        }
    },
    components: {
        CardAnimation
    },
    methods: {
        getDataApi(){
            axios.get(this.url_api)
            .then(response => {
                this.data_events = response.data.data;
                /* Ordenamos los datos para que se muestren de menor a mayor fecha */
                this.data_events.sort(function(a,b){
                return new Date(a.date) - new Date(b.date); 
                });
                /* Calculamos el numero de paginas que tendremos */
                this.numberPages = Math.ceil(this.data_events.length/this.limit); 
                /* Mostramos el numero de cartas que se van a mostrar en la vista */  
                this.getShowCard();
            })
            .catch(error => {
                console.log(error.message);
            })
        },

        next(){
            if(this.page <= this.numberPages){
                this.page++;
            }
        },

        previous(){
            if(this.page >= 1){
                this.page--;
            }
        },

        getShowCard(){
            this.showEvents = this.data_events.slice((this.page-1)*this.limit, this.page*this.limit); 
        },

        arrayPages(){
            for (let i = -2; i <= 2; i++) {
                this.pages.push(this.page+i);
            }
        },

        changePage(index){
            this.page = index;
        }
    },
    created: function() {
        this.getDataApi();
        this.pages = [];
        this.arrayPages();
    },

    watch: {
        'page'() {
            this.pages = [];
            this.arrayPages();
            this.getShowCard();
        }
    }
}
</script>

<style scoped>
    .select{
        background: #FFFFFF;
        color: #000000;
    }
</style>