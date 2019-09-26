<template>
    <div class="">
        <button @click="showModal">Delete</button>
        <ModalDelete :show="show" :id="id" @hideModal="hideModal" @refrestList="refrestList"/>
    </div>

</template>

<script>
import ModalDelete from '@/components/ModalDelete.vue'
import axios from 'axios'
export default {
    name: 'signin',
    components: {
        ModalDelete
    },
    data(){
        return{
            show: false,
            id: "",
            refrest: ""
        }
    },
    methods:{
        showModal(){
            this.show = true;
        },
        hideModal(){
            this.show = false;
        },
        refrestList(){
            this.show = false;
            axios.get("http://localhost:3000/api/v1/events")
            .then(events => {
                this.events=events.data.data.reverse();
            })
            .catch(err => {
                this.error=err;
            })
        }

    }
    
}
</script>

<style>

</style>