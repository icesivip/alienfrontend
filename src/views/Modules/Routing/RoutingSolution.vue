<template>

    <div>
        <h2 class="text-center" >Results</h2>

        <table class="table">
            <thead align="center">
                <tr>
                    <th :colspan="this.route.length">Route</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align:center" :key="i" v-for="(node, i) in route">{{node.id}}</td>
                </tr>
            </tbody>
        </table>

        <card style="width:65%">
            <canvas id="myChart"></canvas>
        </card>
        
    </div>

</template>

<script>


export default {
    props:{
        route: {
        required: true
        }
    },
    methods:{
        graphRoute(){

            var ctx = document.getElementById('myChart').getContext('2d');
            var scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Scatter Dataset',
                        lineTension: 0,
                        showLine:true,
                        fill: false,
                        borderColor: 'rgba(0, 113, 206, 1)', 
                        data: this.route
                    }],
                    
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            offset: true
                        }]
                    },
                }
            });
        }
    },
    computed: {
        routeSize: function(){
            return 1
        }
    },
    watch: {
        route: function(){
            this.graphRoute();
        }
    }
}
</script>
<style>

</style>