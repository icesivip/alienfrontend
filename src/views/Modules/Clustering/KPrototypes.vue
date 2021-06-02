<template>

    
    <div>
        <card>
            <h2>Select your file</h2>
            <div class="container">
                <div class="large-12 medium-12 small-12 cell">
                    <label>File
                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                    </label>
                    <button v-on:click="submitFile()">Submit</button>
                </div>
            </div>

            <div class="scat" style="width: 80%">
                <canvas id="myChart"></canvas>
            </div>

            
        </card>
    </div>
</template>

<script>
import axios from 'axios';


export default {

    name: "Kp",

    data(){

        return{
            file: '',

            scatter: '',

            series: '' 
        }

    },

    methods: {
        
        submitFile(){

            let formData = new FormData();

            formData.append('file', this.file);

            axios.post( 'http://localhost:5000/uplkp',
                formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log('SUCCESS!!');

                console.log(response.data);

                this.scatter = response.data;

                this.graphRoute();

            })
            .catch(function(response){
                console.log(response.message);
            });
        },

        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },

        graphRoute(){

            this.formatData();

            var ctx = document.getElementById('myChart').getContext('2d');
            var scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: this.series
                    
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
        },

        formatData(){

            let datasets = [];

            var COLORS = [];
            while (COLORS.length < Object.keys(this.scatter).length) {
                COLORS.push(`rgb(${this.rand(0, 255)}, ${this.rand(0, 255)}, ${this.rand(0, 255)})`);
            }
            

            for(let i = 0; i < this.scatter.length; i++){
                
                let dic = {};

                

                dic['label'] = `K${i+1}`;
                dic['showline'] = false;
                dic['fill'] = false;
                dic['borderColor'] = COLORS[i];
                dic['data'] = this.scatter[i];

                datasets[i] = dic;
            }

            this.series = datasets;
        },

        rand(frm, to) {
            return ~~(Math.random() * (to - frm)) + frm;
        }       

    }
  }

</script>

<style>

</style>