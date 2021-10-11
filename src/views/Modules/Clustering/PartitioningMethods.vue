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
                <br/>
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
                <div class="containerInfo">
					<h1>PCA</h1>
					<p>El análisis de componenetes principales o PCA por sus siglas en inglés, es una técnica que reduce la dimensionalidad de un conjunto de datos, ya sea para su procesamiento o como herramienta de visualización para el análisis exploratorio de datos.</p>
				</div>
			</div>
			
			<div class="containerMid">
				
			</div>
			
            <card class="containerBot">
                <form>
                    <div class="form-row">
                        <!--Algorithm-->
                        <Select
                        required
                        id="inputAlgorithm"
                        name = "algorithm"
                        type="primary"
                        v-model="input.algorithm"
                        v-validate="inputValidations.algorithm"
                        :error="getError('Algorithm')"
                        placeholder="Algorithm"
                        class="col-md-4"
                        >
                            <Option type="primary" value="K-Means" label="K-Means" key="K-Means">K-Means</Option>
                            <Option type="primary" value="K-Prototype" label="K-Prototype" key="K-Prototype">K-Prototype</Option>
                        </Select>
                        <!--Clusters-->
                        <BaseInput
                        required
                        id="k"
                        name="clusters"
                        type="number"
                        v-model="input.clusters"
                        v-validate="inputValidations.clusters"
                        :error="getError('Clusters')"
                        placeholder="Clusters"
                        class="col-md-8 select-default"
                        />
                    </div>
                    <div>
                        <!--PCA-->
                        <BaseCheckbox
                        name = "pca"
                        v-model="input.pca"
                        v-validate="inputValidations.pca"
                        :error="getError('PCA')"
                        class="mb-3"
                        >
                        PCA
                        </BaseCheckbox>
                    </div>
                    <div class="form-row">
                        <!--Select Dataset-->
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" hidden/>
                        <BaseButton type="primary" v-on:click="chooseFiles()" class="col-md-1">Upload File</BaseButton>
                        <!--Submit-->
                        <BaseButton type="primary" v-on:click="submitFile()" class="col-md-1">Submit</BaseButton>
                    </div>
                    <div>
                        <!--chart-->
                        <div id="scat" style="width: 80%">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                    <div class="form-row">
                        <!--Iteration-->
                        <BaseInput
                        required
                        id="iteration"
                        name="iteration"
                        value = 1
                        type="number"
                        v-model="input.iteration"
                        v-validate="inputValidations.iteration"
                        :error="getError('Iteration')"
                        placeholder="Iterations"
                        class="col-md-2 select-default"
                        />
                        <BaseButton type="primary" v-on:click="step()" class="col-md-1">Next</BaseButton>
                        <BaseButton type="primary" class="col-md-1">End</BaseButton>
                    </div>
                </form>
            </card>
        </card>
    </div>
</template>

<script>
import axios from 'axios';
import {BaseInput} from '../../../components';
import {BaseButton} from '../../../components';
import {BaseCheckbox} from '../../../components';

import {Select, Option} from 'element-ui';
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
        BaseCheckbox,
        Select,
        Option
	},

    data(){

        return{
            file: '',
            scatter: '',

            series: '',
            canvas: '',
            ctx: '',
            chart:'',

            model:'',
            avilableIterations:'',
            iterationIndex:'',

            //Inputs
            input: {
                algorithm: '',
                clusters: 2,
                pca: false,
                iteration: 1
            },
            inputValidations: {
                algorithm:{
                    required: true
                },
                clusters:{
                    required: true,
                    max_value: 8
                },
                pca:{
                    required: true
                },
                iteration:{
                    required: true
                }
            },
            //...
        }

    },

    methods: {
        //Inputs
        getError(fieldName) {
            return this.errors.first(fieldName);
        },
        validate() {
            this.$validator.validateAll().then(isValid => {
                this.$emit('on-submit', this.registerForm, isValid);
            });
        },
        //...

        //Rgb generator
        colors(values){
            return this.recursiveColors(values, 0, [0,0,0]);
        },

        recursiveColors(values, pos, combination){
            var colors = [];
            if(pos < combination.length){
                for(let i = 0; i < values.length; i++){
                    var c = [...combination];
                    c[pos] = values[i];

                    var e = this.recursiveColors(values, pos+1, c);

                    colors = [...colors, ...e];
                }
            }
            else{
                colors.push(combination);
            }
            return colors;
        },
        //...



        canvaConfig(){
            this.canvas = document.getElementById('myChart');
            this.ctx = this.canvas.getContext('2d');
        },

        submitFile(){

            let formData = new FormData();

            formData.append('file', this.file);
            formData.append('clusters', parseInt(document.getElementById("k").value));
            formData.append('iteration', parseInt(document.getElementById("iteration").value));
            formData.append('model', JSON.stringify(this.model))

            axios.post( 'http://localhost:5000/upl',
                formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => { 
                console.log('SUCCESS!!');
                
                console.log(response.data)
                this.model = response.data;
                this.scatter = response.data;

                this.avilableIterations = Object.keys(this.scatter)
                this.iterationIndex = this.avilableIterations[0]

                this.graphRoute();
            })
            // .catch(function(response){
            //     console.log(response.message);
            // });
        },

        chooseFiles() {
            document.getElementById("file").click();
        },

        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },

        graphRoute(){
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.formatData();
            
            if(this.chart == ''){//[Change]
                this.chart = new Chart(this.ctx, {
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
            }
            else{
                this.chart.data.datasets = this.series;
                this.chart.update();
            }
        },

        formatData(){
            

            let data = [];

            //console.log(" >>> Dic Lenght >>> ", Object.keys(this.scatter).length);
            //console.log(" >>> key 0 lenght >>> ", Object.keys(this.scatter[50]).length);
            //console.log(" >>> Access to array >>> ", this.scatter[50][0]);
            //console.log(" >>> ACUÉHTATE >>> ", Object.keys(this.scatter)[0]);
            
            console.log(">>> MOOOODEL >>>", this.model[this.iterationIndex]);

            for(let i=0; i < Object.keys(this.model[this.iterationIndex]).length; i++){

                let dic = []; 

                for(let j=0; j < this.model[this.iterationIndex][i].length; j++){
                    
                    let tempDic = {};

                    tempDic['x'] = this.model[this.iterationIndex][i][j][0];
                    tempDic['y'] = this.model[this.iterationIndex][i][j][1];

                    dic.push(tempDic);
                }

                data.push(dic);
            }

           

            this.scatter = data;



            let datasets = [];

            // var cColors = [
            //     [1,0,0],
            //     [0,1,0],
            //     [0,0,1],
            //     [1,1,0],
            //     [1,0,1],
            //     [0,1,1],
            //     [0,0,0],
            //     [1,1,1]
            // ];
            var cColors = this.colors([0,  0.5,  1]);
            var i = 0;

            var COLORS = [];
            while (COLORS.length < Object.keys(this.scatter).length) {
                if(cColors.length > i){
                    COLORS.push(`rgb(${cColors[i][0]*255}, ${cColors[i][1]*255}, ${cColors[i][2]*255})`);
                }
                else{
                    COLORS.push(`rgb(${this.rand(0,255)}, ${this.rand(0,255)}, ${this.rand(0,255)})`);
                }
                i++;
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
        },
        
        step(){
            //for(let i = 0; i < #; i++){
                this.iterationIndex  = this.forward();
                this.graphRoute();
            //}
        },
        forward(){
            
            let ind = this.avilableIterations.indexOf(this.iterationIndex);
            var respon = 0;

            console.log(">>> ind >>>", ind);

            if(ind <=3){
                respon = this.avilableIterations[parseInt(ind+1)];
            }

            console.log(respon);
            return respon;
        }

    },
    mounted(){
        this.canvaConfig()
    }
  }

</script>

<style>
@import "../../../../node_modules/katex/dist/katex.min.css";

h1 {
  margin-bottom: 0.5em;
}

.config{
    display: block;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
}
</style>