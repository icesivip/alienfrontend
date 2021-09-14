<template>
    <div class = "w-75 m-auto text-center">
        <h1>hello world</h1>
    <input-table> </input-table>
    </div >
</template>
<script>

import RRepository from './../../../repositories/Modules/Routing/Routing';
import InputTable from  './VRPInputTable.vue';
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
      vehicles: [
        {
          id:1,
          c: 10
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
      
      RRepository.solveNearestNeighbours(no).then((response) => {
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
    'input-table': InputTable,
    'routing-solution': RoutingSolution
  }
}
</script>