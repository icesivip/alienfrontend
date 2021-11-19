<template>
  <div id="nn">
    
    <h1>NEAREST NEIGHBOR ALGORITHM</h1>

    <div>
      <button class="btn btn-primary" v-on:click = "changeTuto"> {{tutorial.msg}}</button>
    </div>
    <div v-if="tutorial.value" class="card w-75 m-auto p-3 text-center">
     <b> <h3>What is it?</h3> </b>
     <p>
       Nearest Neighbour is a heuristic algorithm that finds the shortest route from a randomly chosen node.

     </p>
    <b> <h3>What is happening inside the algorithm?</h3> </b>

    <b>To find the optimal sequence, the algorithm follows the steps below.</b>

    <ul>
      <li>
      	Initially, the algorithm fills in a matrix with the distance between the nodes entered by the user.
      </li>
      <img src="/img/Routing/tsp/Step1.gif" alt="Somethig wrong" class="w-50 m-auto">

      <br>

      <li>
        Subsequently, a random node is chosen as the origin of the sequence. The closest node is always taken as the next one in the sequence. When there is not another remaining node, the sequence will end with the origin node. 
      </li>

      <img src="/img/Routing/tsp/Step2.gif" alt="">

      <br>

      <li>
        Finally, the sequence found in the previous step is graphed and the result is printed on screen.
      </li>

      <img src="/img/Routing/tsp/Step3.gif" alt="">

    </ul>

    </div>

    <card>
        <nodes-table :nodes="nodes" @solve="solve"> </nodes-table>
    </card>
    
    <card v-show="solveStatus">
      <routing-solution :route="route" :routeCost="routeCost"></routing-solution>
    </card>
    
  <!-- <pre>
      {{$data}}
  </pre> -->

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
      tutorial:{
        value : false,
        msg : "What is Nearest Neighbour?"
      },
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

    },
    changeTuto(){
      this.tutorial.value = !this.tutorial.value;
      if (this.tutorial.value) this.tutorial.msg = "Hide";
      else this.tutorial.msg = "What is Nearest Neighbour?";
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