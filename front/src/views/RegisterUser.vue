<template>
  <div class="registeruser">
    <div class="d-flex justify-content-around ml-5 mt-5">
        <div class="col-left">
            <div class="d-flex">
                <label class="flex-label text-white mt-1"><h5>Número de afiliado:</h5></label>
                <input type="text" class="form-control flex-input" >
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Primer Apellido:</h5></label>
                <input type="text" class="form-control flex-input" >
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Telefono:</h5></label>
                <input type="text" class="form-control flex-input" >
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Password:</h5></label>
                <input type="password" class="form-control flex-input" >
            </div>
        </div>
            
        <div class="col-right">
            <div class="d-flex">
                <label class="flex-label text-white mt-1"><h5>Nombre:</h5></label>
                <input type="text" class="form-control flex-input" >
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Segundo Apellido:</h5></label>
                <input type="text" class="form-control flex-input" >
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Email:</h5></label>
                <input type="email" class="form-control flex-input" >
            </div>

            <div class="d-flex mt-5">
                <label class="flex-label text-white mt-1"><h5>Confirmar Password:</h5></label>
                <input type="password" class="form-control flex-input" >
            </div>
        </div>
    </div> 

    <div class="d-flex justify-content-end">
       <router-link to="/"><button class="btn-inscription mr-5 mt-3">Registrarse</button></router-link>
    </div>
  </div>
</template>

<script>
export default {

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