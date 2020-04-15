<template>
<div>
  <LPTable v-model="model"> </LPTable>
  <!-- <CraftLayout>
  </CraftLayout> -->
  <button @click="log">Hola</button>
</div>
</template>

<script>
import LPTable from "../../../../components/Modules/LinearProgramming/LPTable";
import CraftLayout from "../CraftMethod";

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
      console.log(process.env.NODE_ENV)
    }
  }
};
</script>

<style></style>
