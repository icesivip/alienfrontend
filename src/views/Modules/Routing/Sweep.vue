<template>
    <div id="sp">
        <h1>SWEEP ALGORITHM</h1>

        <div>
      <button class="btn btn-primary float-start" v-on:click = "changeTuto"> {{tutorial.msg}}</button>
    </div>
    <div v-if="tutorial.value" class="card w-75 m-auto p-3 text-center">
     
     <b> <h3> How it works?</h3> </b>
      <img  v-bind:src="tutorial.imgs[tutorial.tutorialIndex]" alt="Somethig wrong" class="w-50 m-auto">
      <div align="center flex-row" class="d-flex w-100">
        <base-button v-on:click="nextTuto(-1)" class="w-50">prev</base-button>
        <base-button v-on:click="nextTuto(1)" class="w-50">next</base-button>
      </div>
      
    </div>
        <card class="w-100">
            <nodes-table :nodes="nodes" v-on:solve="solve"> </nodes-table>
        </card>
        
        <card v-show="solveStatus">
        <routing-solution :route="route" :routeCost="routeCost"></routing-solution>
        </card>
    </div>
</template>

<script>
import RRepository from './../../../repositories/Modules/Routing/Routing';
import NodesTable from './NodesTable.vue';
import RoutingSolution from './RoutingSolution.vue';

export default {
    name: "sp",
    data() {
        return {
             tutorial:{
        value : false,
        msg : "What is Sweep?",
        imgs: [
          "/img/Routing/sweep/Step1.gif",
          "/img/Routing/sweep/Step2.gif",
          "/img/Routing/sweep/Step3.gif"

        ],
        tutorialIndex:0
         
        
          
        
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
        route: '',
        routeCost: '',
        solveStatus: false,
        };
    },
    methods:{
        solve(nodes){
        this.solveStatus = true;

        var no = {nodes: nodes};
        
        RRepository.solveSweep(no).then((response) => {
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
    },
    nextTuto(n){
      if (n === 1){
        if (this.tutorial.tutorialIndex === 2 ) this.tutorial.tutorialIndex = 0;
        else this.tutorial.tutorialIndex++;
      }else{
        if (this.tutorial.tutorialIndex === 0 ) this.tutorial.tutorialIndex = 2;
        else this.tutorial.tutorialIndex--;
      }
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