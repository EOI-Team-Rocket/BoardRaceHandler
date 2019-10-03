<template>
    <div class="registeruser d-flex justify-content-center">
        <div class="card mt-3">
            <div class="card-header">
                <h1>Registro de usuario</h1>    
            </div>
            <div class="card-body">
                <form>
                    
                    <div class="alert alert-danger" v-if="validation == false">
                        <p v-if="error != ''">El email o el numero de afiliado ya esta en nuestra base de datos</p>
                        <div v-else>
                            <p>No se ha cumplido algunas de las condiciones que poseen *</p>
                        </div>
                       
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="form-group col-md-4"> 
                                <label>Nombre</label>
                                <input type="text" class="form-control" v-model="user.name">
                                <p><small>* Requerido</small></p>
                            </div>

                            <div class="form-group col-md-4"> 
                                <label>Primer Apellido</label>
                                <input type="text" class="form-control" v-model="user.surname1">
                                <p><small>* Requerido</small></p>
                            </div>

                            <div class="form-group col-md-4"> 
                                <label>Segundo Apellido</label>
                                <input type="text" class="form-control" v-model="user.surname2">
                            </div>

                        </div>

                        <div class="row">
                            <div class="form-group col-md-6"> 
                                <label>Numero de afiliado</label>
                                <input type="text" class="form-control" v-model="user.license_number">
                                <p><small>* Requerido</small></p>
                            </div>
                            
                            <div class="form-group col-md-6"> 
                                <label>Email</label>
                                <input type="email" class="form-control" v-model="user.email">
                                <p><small>* Requerido, Formato email</small></p>
                            </div>
                            
                        </div>

                        <div class="row">

                            <div class="form-group col-md-4"> 
                                <label>Telefono 1</label>
                                <input type="text" class="form-control" v-model="user.telf1">
                                <p><small>* Requerido</small></p>
                            </div>

                            <div class="form-group col-md-4"> 
                                <label>Telefono 2</label>
                                <input type="text" class="form-control" v-model="user.telf2">
                            </div>

                            <div class="form-group col-md-4"> 
                                <label>Genero</label>
                                <select class="browser-default custom-select" v-model="user.gender">
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                                <p><small>* Requerido</small></p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-3">  
                                <label>Tipo de Barco</label>
                                <select class="browser-default custom-select" v-model="user.class_boat">
                                    <option>420</option>
                                    <option>470</option>
                                    <option>29-ER</option>
                                    <option>49-ER</option>
                                    <option>Crucero</option>
                                    <option>Hansa 303</option>
                                    <option>Ideal 18</option>
                                    <option>J-80</option>
                                    <option>Kiteboarding</option>
                                    <option>Laser 4.7</option>
                                    <option>Laser Radial</option>
                                    <option>Nacra-17</option>
                                    <option>Optimist</option>
                                    <option>Radio Control</option>
                                    <option>Sin Clase</option>
                                    <option>Snipe</option>
                                    <option>Thecno</option>
                                    <option>Vela Adaptada Iniciacion</option>
                                    <option>Windsurf/Fun Board</option>
                                    <option>Windsurf/RSX</option>
                                    <option>Windsurf/Velocidad</option>
                                </select>
                                <p><small>* Requerido</small></p>
                            </div>

                            <div class="form-group col-md-3"> 
                                <label>Categoría</label>
                                <select class="browser-default custom-select" v-model="user.category">
                                    <option>Infantil</option>
                                    <option>Iniciacion Infantil</option>
                                    <option>Juvenil</option>
                                    <option>Senior</option>
                                    <option>Ampliacion</option>
                                    <option>Ampliacion de Autonomica</option>
                                    <option>Autonomica</option>
                                </select>
                                <p><small>* Requerido</small></p>
                            </div>

                            <div class="form-group col-md-3"> 
                                <label>Club</label>
                                <input type="text" class="form-control" v-model="user.club">
                            </div>

                            <div class="form-group col-md-3"> 
                                <label> Federación</label>
                                <input type="text" class="form-control" v-model="user.federation">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="form-group col-md-6"> 
                            <label>Contraseña</label>
                            <input type="password" class="form-control" v-model="user.password">
                            <p><small>* Requerido, Mínimo 8 caracteres con al menos 1 letra minuscula y 1 letra mayuscula, 
                                      Debe contener caracter especial (* $ @ ! % ? &)</small></p>
                        </div>

                        <div class="form-group col-md-6"> 
                            <label>Confirmar Contraseña</label>
                            <input type="password" class="form-control" v-model="user.confirm_password">
                            <p><small>* Requerido, Debe coincidir con el campo email</small></p>
                        </div>
                    </div>
                
                    <!--Decimos que salga error si el email es igual a alguno que se encuentre en la database-->
                    <div v-if="user.password == '' || 
                               user.password.length < 7 ||
                               validatePassword == false ||
                               user.password != user.confirm_password ||
                               user.email == '' ||
                               validateEmail == false ||
                               user.telf1 == '' ||
                               user.name == '' ||
                               user.surname1 == '' ||
                               user.gender == '' ||
                               user.license_number == '' ||
                               user.class_boat == '' ||
                               user.category == ''">
                        <button type="button" class="btn btn-success mr-5" @click="togleData">Registrarse</button>
                    </div>
                    <div v-else> 
                        <button type="submit" class="btn btn-success mr-5" @click="createUser">Registrarse</button>
                    </div>
                </form>
            </div>
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
                password:"",
                confirm_password:"",
                email: "",
                telf1: "",
                telf2: "",
                name: "",
                surname1: "",
                surname2: "",
                gender: "",
                license_number: "",
                class_boat: "",
                category: "",
                club: "",
                federation: ""
            },
            error:"",
            validation:true,
            validatePassword: false,
            validateEmail: false
        }
    },

    methods: {

        createUser(){
            let newUser = {
                password: this.user.password,
                email: this.user.email,
                telf1: this.user.telf1,
                telf2: this.user.telf2,
                personalInfo: {
                    fullname: {
                        name: this.user.name,
                        surname1: this.user.surname1,
                        surname2: this.user.surname2,
                    },
                    gender: this.user.gender
                },
                sportInfo: {
                    license_number: this.user.license_number,
                    class_boat: this.user.class_boat, 
                    category: this.user.category, 
                    club: this.user.club,
                    federation: this.user.federation
                }
            }
            this.error="";
            /*Le añadimos la condición de que si se añade un email que se encuentra en la base de datos, que no entre 
            en el if */
            if(this.user.password == this.user.confirm_password){
                axios.post('http://localhost:3000/api/v1/users', newUser)
                .then(response => {
                    this.validation = true 
                    localStorage.setItem("jwt", JSON.stringify(response.data));
                    this.$router.replace("/");
                    window.location.reload("/");

                    return console.log(response);  
                })
                .catch(error =>{
                    this.error = error;
                    this.togleData();
                })
            }
        },

        togleData(){
            return this.validation = false;
        }, 
    },

    watch: {
        'user.password'(){
            let regExpresionPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
            this.validatePassword = regExpresionPassword.test(this.user.password);
            return this.validatePassword;
        },
        'user.email'(){
            let regExpresionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
            this.validateEmail = regExpresionEmail.test(this.user.email);
            return this.validateEmail;
        }
    }
}

</script>

<style scoped>
.card-header{
    background-color: rgba(158, 210, 255, 0.8);
    font-weight: bolder;
}
.card .card-body{
    background: rgba(158, 210, 255, 0.5);
    font-weight: bold;
}

</style>