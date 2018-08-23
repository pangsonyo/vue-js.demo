<template>
  <div class="homepage-hero-module">
      <span @click="to">11111111111111</span>
  </div>
</template>
<script>
    export default{
        data(){
           return {

           }
        },
      methods:{
        to(){
          this.$router.push({path:"./index"})
        }
      }
    }
</script>
