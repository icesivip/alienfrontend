<template>
  <div class="row"><h3>Starter page</h3>
  <bb></bb>
  </div>
</template>
<script>
import branch from '../../views/Modules/LinearProgramming/BranchAndBound'
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