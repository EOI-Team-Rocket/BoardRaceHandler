import CardComponent from '@/components/CardComponent.vue';
<template>
    <div class="cardcomponent">
        <div class="card ml-3 mt-3">
            <div class="card-body">
                <p class="card-text"> Lugar: {{place}}</p>      
                <p class="card-text">Categoría: {{category}}</p>
                <p class="card-text">Fecha: {{date}}</p>
                <p class="card-text">Organizador: {{manager}}</p>
                <p class="card-text">Hora: {{hour}}</p>
                <p v-if="gender == 'H'" class="card-text">Gender: Masculino</p>
                <p v-if="gender == 'M'" class="card-text">Gender: Femenino</p>
                <p v-if="gender == 'X'" class="card-text">Gender: Mixto</p>
                <p class="card-text">Tipo de bote: {{boat}}</p>
                <p v-if="capacity != null" class="card-text">Capacity: {{capacity}}</p>
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
    .CardComponent{
        max-height: 345px;
    }

</style>