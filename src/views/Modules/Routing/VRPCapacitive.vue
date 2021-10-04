<template>

    <div id="sp">
        <h1 class="text-center">VRP Capacitive</h1>
        <card>
            <input-table :nodes="nodes" :vehicles = "vehicles" :depot="depot" v-on:solve="solve"> </input-table>
        </card>
        
        <card v-show="solveStatus">
        <routing-solution :route="route" :routeCost="routeCost"></routing-solution>
        </card>
    </div>
</template>

<script>
import RRepository from './../../../repositories/Modules/Routing/Routing';
import VRPInputTable from './VRPInputTable.vue';
import RoutingSolution from './RoutingSolution.vue';

export default {
    name: "VRPC",
    data() {
        return {
        nodes: [  
            {
            id: 0,
            x: 1,
            y: 2,
            demand: 50
            },
            {
            id: 1,
            x: 3,
            y: 4,
            demand: 20
            }
        ],
        vehicles: [
            {
            id: 0,
            capacity: 60,
            },
            {
                id: 1,
                capacity: 20
            }
        ],depot: {
          x:5,
          y:5
        },
        route: '',
        routeCost: '',
        solveStatus: false,
        };
    },
    methods:{
        solve(nodes,vehicles,depot){
        this.solveStatus = true;

        var no = {nodes: nodes};
        var ve = {vehicles: vehicles}
        var de = {depot:depot}
        
        RRepository.solveVRPC(no,ve,de).then((response) => {
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
        'input-table': VRPInputTable,
        'routing-solution': RoutingSolution
    }
}
</script>


<style>

</style>