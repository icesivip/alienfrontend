<template>
  <div id="nn">
    
    <h1>NEAREST NEIGHBOR ALGORITHM</h1>
    <card>
        <nodes-table :nodes="nodes" @solve="solve"> </nodes-table>
    </card>
    
    <card v-show="solveStatus">
      <routing-solution :route="route"></routing-solution>
    </card>
    
 <!--  <pre>
      {{$data}}
  </pre>
 -->
  </div>
</template>
 
<script>

import RRepository from './../../../repositories/Modules/Routing/Routing';
import NodesTable from './NodesTable.vue';
import RoutingSolution from './RoutingSolution.vue';

export default {
  
  name: "nn",
  
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
      roudeID: '',
      solveStatus: false,
    };
  },
  methods:{
    solve(nodes){
      this.solveStatus = true;

      var no = {nodes: nodes};
      
      RRepository.solveNearestNeighbours(no).then((response) => {
          if(response.status < 400){
            //this.route = response.data.split("},"); //Cambiar el -S
            this.route = response.data;
            console.log(this.route);
          }
        }
      );

    }
  },
  components: {
    'nodes-table': NodesTable,
    'routing-solution': RoutingSolution
  }
}
</script>

<style>
</style>