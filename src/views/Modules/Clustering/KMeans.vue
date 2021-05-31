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

            graph: ''
        }

    },
    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://cdn.plot.ly/plotly-latest.min.js')
      document.head.appendChild(recaptchaScript)
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
            ).then(function (response){
                console.log('SUCCESS!!');

                console.log(response.data);


                //this.graph = Plotly.newPlot('plotlyExample-div', response, response.data.layout);

                this.graph = response.data;

            })
            .catch(function(){
                console.log('FAILURE!!');
            });
        },

        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },

        get_test(){
            axios.get('http://localhost:5000/testt')
            .then(response => {
                console.log(response.data);})
            
            .catch(e => {
                console.log(e);
            })
        }

    }
  }

</script>

<style>

</style>