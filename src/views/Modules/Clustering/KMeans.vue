<template>

    
    <div>
        <card>
			<div class="contanerTop">
				<div class="containerInfo">
					<h1>K-Means</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor vitae urna pretium faucibus in a sem. Sed pulvinar, lectus a imperdiet congue, enim nibh dignissim leo, at rutrum libero ipsum nec metus. In convallis ut neque sit amet finibus. Curabitur commodo est mi, a pellentesque massa pulvinar lacinia. Integer aliquet ac velit sit amet consectetur. Nullam venenatis libero in neque fringilla, id sagittis dui convallis. In facilisis arcu a ipsum lobortis placerat. In vulputate imperdiet turpis ut ultricies. Morbi commodo tincidunt semper. Proin egestas at nisl quis hendrerit. Maecenas id ligula gravida, consectetur velit et, feugiat leo. Phasellus maximus turpis sit amet porttitor aliquet. </p>
					<p><b>a + b + c = d</b></p>
				</div>
				<div class="containerInfo">
					<h1>K-Prototype</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor vitae urna pretium faucibus in a sem. Sed pulvinar, lectus a imperdiet congue, enim nibh dignissim leo, at rutrum libero ipsum nec metus. In convallis ut neque sit amet finibus. Curabitur commodo est mi, a pellentesque massa pulvinar lacinia. Integer aliquet ac velit sit amet consectetur. Nullam venenatis libero in neque fringilla, id sagittis dui convallis. In facilisis arcu a ipsum lobortis placerat. In vulputate imperdiet turpis ut ultricies. Morbi commodo tincidunt semper. Proin egestas at nisl quis hendrerit. Maecenas id ligula gravida, consectetur velit et, feugiat leo. Phasellus maximus turpis sit amet porttitor aliquet.</p>
					<p><b>a + b + c = d</b></p>
				</div>
			</div>
			
			<div class="containerMid">
				<div class="containerInfo">
					<h1>PCA</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor vitae urna pretium faucibus in a sem. Sed pulvinar, lectus a imperdiet congue, enim nibh dignissim leo, at rutrum libero ipsum nec metus. In convallis ut neque sit amet finibus. Curabitur commodo est mi, a pellentesque massa pulvinar lacinia. Integer aliquet ac velit sit amet consectetur. Nullam venenatis libero in neque fringilla, id sagittis dui convallis. In facilisis arcu a ipsum lobortis placerat. In vulputate imperdiet turpis ut ultricies. Morbi commodo tincidunt semper. Proin egestas at nisl quis hendrerit. Maecenas id ligula gravida, consectetur velit et, feugiat leo. Phasellus maximus turpis sit amet porttitor aliquet. </p>
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
                    <BaseInput label="Clusters"/>

                    <!--PCA-->
                    <BaseCheckbox>PCA</BaseCheckbox>

                    <!--Iteration-->
                    <BaseInput label="Iteration"/>

                    <!--Test-->
                    <BaseButton v-on:click="get_test()">Test</BaseButton>

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


export default {

    name: "Km",

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
.contanerTop{
	display: grid;
	grid-template-columns:50% 50%;
	grid-gap: 1rem;
}
</style>