<template>

    
    <div>
        <card>
			<div class="contanerTop">
				<div class="containerInfo">
					<h1>K-Means</h1>
					<p>El algoritmo K-Means propuesto en 1967 tiene como objetivo realizar k particiones en un conjunto de datos proporcionado. Cada partición está representada por un punto (llamado centroide) que es el promedio de los puntos en esa partición. Este método empieza con k centroides aleatorios, posteriormente se asignan los datapoints más cercanos a estos, se reasigna el vlaor del centroide respecto a los valores de cada cluster y se vuelve a hacer la asignación de puntos. Este proceso se itera hasta que el cambio en los clusters sea mínimo.</p>
                    <div v-katex:auto>
                        \(d(x_{i},q_{l})=\sum_{s=p+1}^{m}\sqrt{(x_{i,s}^{N}-q_{l,s}^{N})^{2}}\)
                    </div>
				</div>
				<div class="containerInfo">
					<h1>K-Prototypes</h1>
					<p>El algoritmo K-Prototypes trabaja de una manera muy similar al K-Means; sin embargo, mientras el primero toma en cuenta valores tanto discretos como contínuos, el segundo únicamente admite valores contínuos. El proceso es el mismo, la única diferencia es su función de coste, que básicamente es la misma del K-means pero sumándole una función delta para las variables discretas.</p>
					<div v-katex:auto>
                        \(d(x_{i},q_{l})=\gamma\sum_{s=1}^{p}\delta(x_{i,s}^{c}-q_{l,s}^{c})+\sum_{s=p+1}^{m}\sqrt{(x_{i,s}^{N}-q_{l,s}^{N})^{2}}\)
                    </div>
                    <div v-katex:auto>
                        \(\delta(x_{i},q_{l})=\begin{Bmatrix}
                        0,x_{i,s}=q_{l,s'}
                        \\
                        1,x_{i,s}\neq q_{l,s'}
                        \end{Bmatrix}\)
                    </div>
				</div>
			</div>
			
			<div class="containerMid">
				<div class="containerInfo">
					<h1>PCA</h1>
					<p>El análisis de componenetes principales o PCA por sus siglas en inglés, es una técnica que reduce la dimensionalidad de un conjunto de datos, ya sea para su procesamiento o como herramienta de visualización para el análisis exploratorio de datos.</p>
				</div>
			</div>
			
            <card class="containerBot">
                <div>
                    <!--Algorithm-->
                    <BaseInput label="Algorithm">
                        <select id="inputAlgorithm">
                            <option selected>K-Means</option>
                            <option selected>K-Prototype</option>
                        </select>
                    </BaseInput>

                    <!--Select Dataset-->
                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" hidden/>
                    <BaseButton v-on:click="chooseFiles()">Upload File</BaseButton>

                    <!--Submit-->
                    <BaseButton v-on:click="submitFile()">Submit</BaseButton>

                    <!--Clusters-->
                    <input type="number" class="config" placeholder="# de clusters"/>

                    <!--PCA-->
                    <BaseCheckbox>PCA</BaseCheckbox>

                    <!--Iteration-->
                    <input placeholder="# de iteraciones" class="config"/>

                    <!--chart-->
                    <div class="scat" style="width: 80%">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </card>
            
        </card>
    </div>
</template>

<script>
import axios from 'axios';
import {BaseInput} from '../../../components';
import {BaseButton} from '../../../components';
import {BaseCheckbox} from '../../../components';
import Vue from 'vue';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.use(VueKatex, {
  globalOptions: {
    //... Define globally applied KaTeX options here
  }
});

export default {

    name: "pm",

	components: {
		BaseInput,
		BaseButton,
        BaseCheckbox
	},

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
            formData.append('clusters', document.getElementById("k").textContent);

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

        chooseFiles() {
            document.getElementById("file").click();
        },

        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            console.log(this.file);
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



            let datasets = [];

            var COLORS = [];
            while (COLORS.length < Object.keys(this.scatter).length) {
                COLORS.push(`rgb(${this.rand(0, 255)}, ${this.rand(0, 255)}, ${this.rand(0, 255)})`);
            }
            

            for(let i = 0; i < data.length; i++){
                
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
@import "../../../../node_modules/katex/dist/katex.min.css";

.contanerTop{
	display: grid;
	grid-template-columns:50% 50%;
	grid-gap: 1rem;
}

.config{
    display: block;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
}
</style>