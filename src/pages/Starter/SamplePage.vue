<template>
  <div class="row"><h3>Starter page</h3>
  <bb></bb>
  </div>
</template>
<script>
import branch from '../../components/AlienComponents/B&B/BranchAndBound.vue'
export default {
  name: 'starter-page',
  data() {
    return {};
  },
  components:{
      'bb' : branch
  }
};
</script>
<style></style>