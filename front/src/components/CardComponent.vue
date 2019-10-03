import CardComponent from '@/components/CardComponent.vue';
<template>
    <div class="cardcomponent transparentblue">
        <div class="card ml-3 mt-3">
            <div class="card-body">
                <p class="card-text"> Lugar: &nbsp;<span class="clean">{{place}}</span></p>      
                <p class="card-text">Categoría: &nbsp;<span class="clean">{{category}}</span></p>
                <p class="card-text">Fecha: &nbsp;<span class="clean">{{date}}</span></p>
                <p class="card-text">Organizador: &nbsp;<span class="clean">{{manager}}</span></p>
                <p class="card-text">Hora: &nbsp;<span class="clean">{{hour}}</span></p>
                <p v-if="gender == 'H'" class="card-text">Gender: &nbsp;<span class="clean"> Masculino </span></p>
                <p v-if="gender == 'M'" class="card-text">Gender: &nbsp;<span class="clean"> Femenino</span></p>
                <p v-if="gender == 'X'" class="card-text">Gender: &nbsp;<span class="clean"> Mixto </span></p>
                <p class="card-text">Tipo de bote: &nbsp;<span class="clean">{{boat}}</span></p>
                <p v-if="capacity != null" class="card-text">Capacity: <span class="clean">{{capacity}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        place:String,
        category:String,
        date: String,
        manager:String,
        hour:String,
        gender:String,
        boat:String,
        capacity:Number
    }
}
</script>

<style scoped>

.card-body{
  background-color: rgba(158, 210, 255, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.card-text{
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: bolder;
}

.clean{
  font-weight: normal;
}
.CardComponent{
        
        max-height: 345px;
   }

</style>