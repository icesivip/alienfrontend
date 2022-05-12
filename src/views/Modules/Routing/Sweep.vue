<template>
    <div id="sp">
        <h1>SWEEP ALGORITHM</h1>

        <div>
      <button class="btn btn-primary float-start" v-on:click = "changeTuto"> {{tutorial.msg}}</button>
    </div>
      <div v-if="tutorial.value" class="card my-3 mx-auto p-5 text-center">

        <b> <h3> How it works?</h3> </b>
        <carousel :navigationEnabled="true" :perPage="1">
          <slide :key="'tutorialGif'+ i" v-for="(tutorialGif,i) in tutorial.imgs">
            <img  v-bind:src="tutorialGif" alt="Something wrong" class="w-75 m-auto">
          </slide>
        </carousel>

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
import {Carousel, Slide} from 'vue-carousel';

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

        ]
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
    }
    },
    components: {
      'nodes-table': NodesTable,
      'routing-solution': RoutingSolution,
      'carousel':Carousel,
      'slide':Slide,
    }
}
</script>


<style>

</style>
