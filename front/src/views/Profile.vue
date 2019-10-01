<template>
    <div class="">
        <button @click="deleteUser">Delete</button>
    </div>
</template>

<script>
export default {
    name: 'profile',
    methods:{
        deleteUser(){
            const jwt = JSON.parse(localStorage.getItem('jwt'));
            const tkn = jwt.acces_token;
            const licenseNum = jwt.license_number;
            console.log("Bearer "+tkn);
            
            axios.delete("http://localhost:3000/api/v1/users/"+licenseNum,{headers: {"Authorization": "Bearer " + tkn}}).then((res => {
                console.log("BORRADO");
                localStorage.removeItem("jwt");
                
            })).catch(err => {
                console.log(err);
                
            })
            
        }
    }
}
</script>

<style scoped>

</style>