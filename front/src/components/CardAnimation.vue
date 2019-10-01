<template>
    <div class="cardanimation">
        <div class="flip-card mt-5 ml-5">
            <div class="flip-card-inner">
                <div class="card flip-card-front">
                    <img v-if="img != null" class="card-img" :src="img" alt="No se ha podido cargar la imagen">
                    <img v-else class="card-img" src="../assets/regattaExample.jpg" alt="No se ha podido cargar la imagen">
                    <div class="card-body">
                        <h5 class="card-title text-dark">{{title}}</h5>
                    </div>      
                </div>
                <div class="card flip-card-back">
                    <h1 class="mt-5"><b>{{title}}</b></h1> 
                    <h2>{{place}}</h2> 
                    <h3>{{date}}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:"cardanimation",
    props:{
        title: String,
        place: String,
        date: String,
        img:String
    }
}
</script>

<style scoped>

    .card-img{
        max-height: 80%;
    }

    .flip-card {
        background-color: transparent;
        width: 300px;
        height: 300px;
        perspective: 1000px;
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }

    .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
    }

    .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
    }

    .flip-card-front > img{
        widows: 300px;
        height: 300px;
    }

    .flip-card-back {
    background-color: rgba(255, 255, 255, 0.85);
    color: #4C71BF;
    transform: rotateY(180deg);
    }

</style>