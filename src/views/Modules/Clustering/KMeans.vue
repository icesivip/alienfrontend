<template>
  <div id="km">
    <h1>Hello World!</h1>
    <h2> {{ nombre }} </h2>
    
    <input  type="button" v-on:click="increment" value="Increment">
    <input v-model="nombre" type="text">
    <div v-show="cshow" :key="i" v-for="(num, i) in list">ID: {{i}}, Num: {{ num }} </div>


  </div>
</template>

<script>
export default {
    name: "km",
    data(){
        return{
            nombre: "Esteban",
            list: [1, 2 , 3],
            currentNumber: 4,
            cshow: false
        }
        
    },
    methods: {
        increment(){
            this.cshow = true;
            this.list.push(this.currentNumber);
            this.currentNumber = this.currentNumber + 1;
        }
    }
}

</script>

<style>

</style>