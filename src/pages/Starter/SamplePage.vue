<template>
  <div class="container">
    <div class="row">
      <h3>Starter page</h3>
    </div>
    <div class="d-flex justify-content-center">
      <app-table></app-table>
    </div>
  </div>
</template>
<script>
import graphical from '../../graphicalMethod.vue'
export default {
  name: 'starter-page',
  
  data() {
    return {
      
    };
  },
  components: {
      'app-table' : graphical
  },
  methods: {

  }
};

</script>
<style></style>
