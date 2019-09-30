<template>
  <div class="registeruser">
    <div class="d-flex justify-content-around ml-5 mt-5">
        <div class="col-left">
            <div class="d-flex">
                <label class="flex-label text-white mt-1"><h5>* Número de afiliado:</h5></label>
                <input type="text" class="form-control flex-input" v-model="user.license_number">
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>* Primer Apellido:</h5></label>
                <input type="text" class="form-control flex-input" v-model="user.surname1">
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>* Telefono:</h5></label>
                <input type="text" class="form-control flex-input" v-model="user.telf1">
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>* Password:</h5></label>
                <input type="password" class="form-control flex-input" v-model="user.password">
            </div>
        </div>
            
        <div class="col-right">
            <div class="d-flex">
                <label class="flex-label text-white mt-1"><h5>* Nombre:</h5></label>
                <input type="text" class="form-control flex-input" v-model="user.name">
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Segundo Apellido:</h5></label>
                <input type="text" class="form-control flex-input" v-model="user.surname2">
            </div>
            
            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>* Email:</h5></label>
                <input type="email" class="form-control flex-input" v-model="user.email">
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>* Confirmar Password:</h5></label>
                <input type="password" class="form-control flex-input" v-model="user.confirm_password">
            </div>
        </div>
    </div> 

    <div class="d-flex justify-content-end" v-if="user.license_number == '' || user.name == '' || user.surname1 == '' 
                                                 || user.telf1 == '' || user.email == '' || user.password == '' 
                                                 || user.confirm_password == '' || user.password != user.confirm_password">
        <button type="submit" class="btn-inscription mr-5 mt-3"
                                   @click="createUser">Registrarse</button>
    </div>

    <div class="d-flex justify-content-end" v-else>
       <router-link to="/"><button type="submit" class="btn-inscription mr-5 mt-3"
                                   @click="createUser">Registrarse</button></router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"registeruser",
    data(){
        return{
            user:{
                license_number:"",
                name:"",
                surname1:"",
                surname2:"",
                telf1:"",
                email:"",
                password:"",
                confirm_password:""
            }
        }
    },

    methods: {
        createUser(){
            let newUser = {
                password: this.user.password,
                email: this.user.email,
                telf1: this.telf1,
                personalInfo: {
                    fullname: {
                        name: this.user.name,
                        surname1: this.surname1,
                        surname2: this.surname2,
                    },
                    gender: "H" /*Borrar en el futuro */
                },
                sportInfo: {
                    license_number: this.license_number,
                    speciality: ["Deportista"], /*Borrar en el futuro */
                    class_boat: "Laser Radial", /*Borrar en el futuro */
                    category: "Infantil", /*Borrar en el futuro */
                    state: "Activo" /*Borrar en el futuro */
                }
            }
            
            
            if(this.user.password == this.user.confirm_password){
                axios.post('http://localhost:3000/api/v1/users', newUser)
                .then(response => {
                    return console.log(response);  
                })
                .catch(error =>{
                    return console.log(error);
                })
            }
        }
    }
}

</script>

<style scoped>
    
    .col-left{
        flex:0 0 40%;
    }

    .col-right{
        flex: 0 0 40%;
    }

    .flex-label{
        flex: 0 0 40%;
    }
    .flex-input{
        flex: 0 0 60%;
    }
  

    .btn-inscription {
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

    .btn-inscription:hover {
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