<template>
  <div>
    <h1>OPT 3 MOVE ALGORITHM</h1>
    <card>
        <nodes-table :nodes="nodes" @solve="solve"> </nodes-table>
    </card>
    
    <card v-show="solveStatus">
      <routing-solution :route="route" :routeCost="routeCost"></routing-solution>
    </card>
  </div>
</template>

<script>
import RRepository from './../../../repositories/Modules/Routing/Routing';
import NodesRouteTable from './NodesRouteTable.vue';
import RoutingSolution from './RoutingSolution.vue';

export default {
  
  name: "ck",
  
  data() {
    return {
      nodes: [  
        {
          id: 0,
          x: 1,
          y: 2,
        },
        {
          id: 1,
          x: 3,
          y: 4,
        }
      ],
      route: '',
      routeCost: '',
      solveStatus: false,
    };
  },
  methods:{
    solve(nodes){
      this.solveStatus = true;

      var no = {nodes: nodes};
      
      RRepository.solveClarkAndWright(no).then((response) => {
          if(response.status < 400){
            let r = response.data
            this.routeCost = r[0];
            this.route = r.slice(1, r.length);
          }
        }
      );

    }
  },
  components: {
    'nodes-table': NodesRouteTable,
    'routing-solution': RoutingSolution
  }
}
</script>

<style>

</style>