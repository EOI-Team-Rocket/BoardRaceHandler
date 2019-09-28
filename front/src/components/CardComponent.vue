<template>
    <div class="cardcomponent col-6">
        <div class="card ml-2 mt-3">
            <div class="card-body">
                <h4 class="card-text"><b>{{data}}</b></h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:String
    }

}
</script>

<style>

</style>