<template>
  <div class="form">
      <FormCreate :id="id"/> 
  </div>
</template>

<script>
//send query params to the label
import FormCreate from '@/components/FormCreate.vue'
export default {
  name: 'create',
  components: {
    FormCreate
  },
  data(){
    return{
      id: null
    }
  },
  created(){
    if(this.$route.query.id!=null && this.$route.query.id!=undefined){
      this.id=this.$route.query.id;
    }
  }
}
</script>

<style>

</style>