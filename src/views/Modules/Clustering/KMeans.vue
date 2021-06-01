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

            <button v-on:click="get_test()">TEST</button>

            <h1>{{ xd }}</h1>

            <div class="scat" style="width: 80%">
                <canvas id="myChart"></canvas>
            </div>

            
        </card>
    </div>
</template>

<script>
import axios from 'axios';


export default {

    name: "Km",

    data(){

        return{
            file: '',

            scatter: '',

            s1: '',
            
            s2: '',

            s3: '',  

            xd: ''
        }

    },

    methods: {
        
        submitFile(){

            let formData = new FormData();

            formData.append('file', this.file);

            axios.post( 'http://localhost:5000/upl',
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

                console.log(Object.keys(this.scatter).length);

                this.graphRoute();

            })
            .catch(function(response){
                console.log(response.message);
            });
        },

        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },

        get_test(){
            axios.get('http://localhost:5000/testt')
            .then(response => {
                console.log(response.data);
                this.xd = 'testeado';})
            
            .catch(e => {
                console.log(e);
            })
        },

        graphRoute(){

            this.formatData();

            var ctx = document.getElementById('myChart').getContext('2d');
            var scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'K1',
                        lineTension: 0,
                        showLine:false,
                        fill: false,
                        borderColor: 'rgba(0, 113, 206, 1)', 
                        data: this.s1
                    },{

                        label: 'k2',
                        lineTension: 0,
                        showLine:false,
                        fill: false,
                        borderColor: 'rgba(241, 74, 38, 1)', 
                        data: this.s2
                    
                    },{

                        label: 'k3',
                        lineTension: 0,
                        showLine:false,
                        fill: false,
                        borderColor: 'rgba(72, 241, 38, 1)', 
                        data: this.s3
                    
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
        },

        formatData(){
            

            let data = [];


            for(let i=0; i < Object.keys(this.scatter).length; i++){

                let dic = []; 

                for(let j=0; j < this.scatter[i].length; j++){
                    
                    let tempDic = {};

                    tempDic['x'] = this.scatter[i][j][0];
                    tempDic['y'] = this.scatter[i][j][1];

                    dic.push(tempDic);
                }

                data.push(dic);
            }

           

            this.scatter = data;
            this.s1 = data[0];
            this.s2 = data[1];
            this.s3 = data[2];

        }

    }
  }

</script>

<style>

</style>