<template>
<div>
  <LPTable v-model="model"> </LPTable>
  <!-- <CraftLayout>
  </CraftLayout> -->
  <button @click="log">Hola</button>
</div>
</template>

<script>
import LPTable from "../Auxiliary/LPTable.vue";
import CraftLayout from "../CRAFT/CraftLayout";
export default {
  data(){
    return{
      model:{}
    }
  },
  components: {
    // [LPTable.name]: LPTable
    CraftLayout,
    LPTable
  },
  methods: {
    manage(variable) {
      console.log(variable);
    },
    log(){
      console.log(this.model)
    }
  }
};
</script>

<style></style>
