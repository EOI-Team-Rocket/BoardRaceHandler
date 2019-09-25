<template> 
<!-- INVESTIGAR EL GRID PARA MAQUETARLO -->
    <div class="d-flex justify-content-between">
        <div>
            <span>
                {{event.title}}
            </span>
        </div>
        <div>
            <span>
                {{event.date}}
            </span>
        </div>  
        <div>
            <span>
                {{event.place}}
            </span>
        </div>            
    </div>
</template>

<script>
export default {
    name: "eventItem",
    props: ["event"],
}
</script>

<style>

</style>