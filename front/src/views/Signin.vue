<template>
    <div class="">
        <button @click="deleteUser">Delete</button>
        <ModalDelete :show="show" :id="id" @hideModal="hideModal" @refrestList="refrestList"/>
        <GMap/>
    </div>
    
</template>

<script>
import GMap from "@/components/GMapForm.vue";
import ModalDelete from '@/components/ModalDelete.vue'
import axios from 'axios'
export default {
    name: 'signin',
    components: {
        ModalDelete,
        GMap
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
        },
        deleteUser(){
            const jwt = JSON.parse(localStorage.getItem('jwt'));
            const tkn = jwt.acces_token;
            const licenseNum = jwt.license_number;
            console.log("Bearer "+tkn);
            
            axios.delete("http://localhost:3000/api/v1/users/"+licenseNum,{headers: {"Authorization": "Bearer " + tkn}}).then((res => {
                console.log("BORRADO");
                localStorage.removeItem("jwt");
                this.$router.replace('/');
                
            })).catch(err => {
                console.log(err);
                
            })
            
        }

    }
    
}
</script>

<style>

</style>